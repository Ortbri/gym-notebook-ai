import { unstable_headers } from 'expo-router/rsc/headers';

import 'server-only';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage } from 'ai';
// eslint-disable-next-line import/order
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';

// Skeleton and display components
// import { unstable_headers } from 'expo-router/rsc/headers';
// import { z } from 'zod';

import { z } from 'zod';

import MarkdownText from '~/components/Markdown';

// import { getPlacesInfo } from './map/googleapis-maps';
// import { MapCard, MapSkeleton } from './map/map-card';
// import MarkdownText from './markdown-text';
// import { MoviesCard, MoviesSkeleton } from './movies/movie-card';
// import { WeatherCard } from './weather';
// import { getWeatherAsync } from './weather-data';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

export async function onSubmit(message: string) {
  'use server';

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: message,
      },
    ],
  });

  //
  const headers = await unstable_headers();

  const tools: Record<string, any> = {};

  // The map feature is native only for now.
  //   if (process.env.EXPO_OS !== 'web') {
  //     tools.get_points_of_interest = {
  //       description: 'Get things to do for a point of interest or city',
  //       parameters: z
  //         .object({
  //           poi: z
  //             .string()
  //             .describe(
  //               'query to send to the Google Places API. e.g. "things to do in Amsterdam" or "casinos and hotels in Las Vegas"'
  //             ),
  //         })
  //         .required(),
  //       async *generate({ poi }) {
  //         console.log('city', poi);
  //         // Show a spinner on the client while we wait for the response.
  //         yield <MapSkeleton />;

  //         const pointsOfInterest = await getPlacesInfo(poi);

  //         // Return the points of interest card to the client.
  //         return <MapCard city={poi} data={pointsOfInterest} />;
  //       },
  //     };
  //   }
  //   - city: ${headers.get('eas-ip-city') ?? (__DEV__ ? 'Austin' : 'unknown')}
  //   - country: ${headers.get('eas-ip-country') ?? (__DEV__ ? 'US' : 'unknown')}
  //   - region: ${headers.get('eas-ip-region') ?? (__DEV__ ? 'TX' : 'unknown')}
  //   - device platform: ${headers.get('expo-platform') ?? 'unknown'}

  const result = await streamUI({
    model: openai('gpt-4o-mini-2024-07-18'),
    messages: [
      {
        role: 'system',
        content: `
You are a helpful chatbot workout notebook assistant. You can provide workout recommendations and notes. 
You have the following tools available:
- get_workout: Lists or search workout from TMDB.
- track_workout: Tracks and create a workout.
- get_note: Gets the notes for a workout.

User info:
- today's workout: "Chest Day"
- today's date: "2025-04-08"
`,
      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        });
      }
      return <MarkdownText>{content}</MarkdownText>;
    },
    // Define the tools here:
    tools: {
      ...tools,
      get_media: {
        description: 'Get workout from ',
        parameters: z
          .object({
            name: z
              .enum(['Press', 'week'])
              .describe('Press will match Dumbell Bench Press')
              .optional(),
            type: z
              .enum(['tv', 'movie'])
              .describe('type of media to search for')
              .default('movie')
              .optional(),
            generated_description: z.string().describe('AI-generated description of the tool call'),
            query: z
              .string()
              .describe(
                'The query to use for searching movies or TV shows. Set to undefined if looking for trending, new, or popular media.'
              )
              .optional(),
          })
          .required(),
        async *generate({ generated_description, time_window, media_type, query }) {
          yield <div>Loading...</div>;

          let url: string;
          if (query) {
            url = `https://api.themoviedb.org/3/search/${media_type}?api_key=${
              process.env.TMDB_API_KEY
            }&query=${encodeURIComponent(query)}`;
          } else {
            url = `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${process.env.TMDB_API_KEY}`;
          }

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch trending movies');
          }
          const data = await response.json();
          const movies = data.results.map((media: any) => {
            if (!media.media_type) {
              media.media_type = media_type;
            }
            return media;
          });
          return <MoviesCard data={movies} title={generated_description} />;
        },
      },
      //   get_weather: {
      //     description: 'Get the current weather for a city',
      //     parameters: z
      //       .object({
      //         city: z.string().describe('the city to get the weather for'),
      //       })
      //       .required(),
      //     async *generate({ city }) {
      //       yield <WeatherCard city={city} />;
      //       // await new Promise((resolve) => setTimeout(resolve, 5000));

      //       const weatherInfo = await getWeatherAsync(city);
      //       console.log('weatherInfo', JSON.stringify(weatherInfo));
      //       return <WeatherCard city={city} data={weatherInfo} />;
      //     },
      //   },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

const nanoid = () => Math.random().toString(36).slice(2);

/* -------------------------------------------------------------------------- */
/*                                    types                                   */
/* -------------------------------------------------------------------------- */
export type Message = CoreMessage & {
  id: string;
};

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

const actions = {
  onSubmit,
} as const;

export const AI = createAI<AIState, UIState, typeof actions>({
  actions,
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
});
