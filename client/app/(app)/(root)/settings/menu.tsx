import { BodyScrollView } from '~/components/BodyScroll';
import Menu from '~/components/menu/menu';

export default function MenuScreen() {
  return (
    <BodyScrollView contentContainerStyle={{}}>
      <Menu />
    </BodyScrollView>
  );
}
