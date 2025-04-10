// Auto-generated exercise data types

export type Difficulty =
  | "Advanced"
  | "Beginner"
  | "Expert"
  | "Grand Master"
  | "Intermediate"
  | "Legendary"
  | "Master"
  | "Novice";

export type MuscleGroup =
  | "Abdominals"
  | "Abductors"
  | "Adductors"
  | "Back"
  | "Biceps"
  | "Calves"
  | "Chest"
  | "Forearms"
  | "Glutes"
  | "Hamstrings"
  | "Hip Flexors"
  | "Quadriceps"
  | "Shins"
  | "Shoulders"
  | "Trapezius"
  | "Triceps";

export type Muscle1 =
  | "Adductor Magnus"
  | "Anterior Deltoids"
  | "Biceps Brachii"
  | "Biceps Femoris"
  | "Brachioradialis"
  | "Erector Spinae"
  | "Gastrocnemius"
  | "Gluteus Maximus"
  | "Gluteus Medius"
  | "Iliopsoas"
  | "Infraspinatus"
  | "Lateral Deltoids"
  | "Latissimus Dorsi"
  | "Obliques"
  | "Pectoralis Major"
  | "Posterior Deltoids"
  | "Quadriceps Femoris"
  | "Rectus Abdominis"
  | "Soleus"
  | "Subscapularis"
  | "Tibialis Anterior"
  | "Triceps Brachii"
  | "Upper Trapezius"
  | "Vastus Medialis";

export type Muscle2 =
  | "Adductor Magnus"
  | "Anconeus"
  | "Anterior Deltoids"
  | "Biceps Brachii"
  | "Biceps Femoris"
  | "Brachialis"
  | "Brachioradialis"
  | "Extensor Digitorum Longus"
  | "Gastrocnemius"
  | "Gluteus Maximus"
  | "Gluteus Medius"
  | "Gluteus Minimus"
  | "Iliopsoas"
  | "Infraspinatus"
  | "Latissimus Dorsi"
  | "Levator Scapulae"
  | "Medial Deltoids"
  | "Obliques"
  | "Pectoralis Major"
  | "Posterior Deltoids"
  | "Quadriceps Femoris"
  | "Rectus Abdominis"
  | "Rectus Femoris"
  | "Rhomboids"
  | "Soleus"
  | "Subscapularis"
  | "Supraspinatus"
  | "Teres Major"
  | "Triceps Brachii";

export type Muscle3 =
  | "Adductor Magnus"
  | "Anterior Deltoids"
  | "Biceps Brachii"
  | "Biceps Femoris"
  | "Brachialis"
  | "Brachioradialis"
  | "Erector Spinae"
  | "Extensor Hallucis Longus"
  | "Flexor Carpi Radialis"
  | "Gastrocnemius"
  | "Gluteus Maximus"
  | "Gluteus Medius"
  | "Gluteus Minimus"
  | "Iliopsoas"
  | "Latissimus Dorsi"
  | "Obliques"
  | "Pectoralis Major"
  | "Posterior Deltoids"
  | "Quadriceps Femoris"
  | "Rectus Abdominis"
  | "Rectus Femoris"
  | "Rhomboids"
  | "Serratus Anterior"
  | "Soleus"
  | "Tensor Fasciae Latae"
  | "Teres Minor"
  | "Tibialis Anterior"
  | "Tibialis Posterior"
  | "Trapezius"
  | "Triceps Brachii"
  | "Upper Trapezius";

export type EquipmentMain =
  | "Ab Wheel"
  | "Barbell"
  | "Battle Ropes"
  | "Bodyweight"
  | "Bulgarian Bag"
  | "Cable"
  | "Clubbell"
  | "Dumbbell"
  | "EZ Bar"
  | "Gymnastic Rings"
  | "Heavy Sandbag"
  | "Indian Club"
  | "Kettlebell"
  | "Landmine"
  | "Macebell"
  | "Medicine Ball"
  | "Miniband"
  | "Parallette Bars"
  | "Pull Up Bar"
  | "Resistance Band"
  | "Sandbag"
  | "Slam Ball"
  | "Sled"
  | "Sliders"
  | "Stability Ball"
  | "Superband"
  | "Suspension Trainer"
  | "Tire"
  | "Trap Bar"
  | "Wall Ball"
  | "Weight Plate";

export type EquipmentMainQty =
  | "1"
  | "2";

export type EquipmentSecondary =
  | "Barbell"
  | "Battle Ropes"
  | "Bench (Decline)"
  | "Bench (Flat)"
  | "Bench (Incline)"
  | "Bulgarian Bag"
  | "Cable"
  | "Clubbell"
  | "Dumbbell"
  | "Gravity Boots"
  | "Kettlebell"
  | "Landmine"
  | "Macebell"
  | "Miniband"
  | "None"
  | "Parallette Bars"
  | "Plyo Box"
  | "Pull Up Bar"
  | "Sandbag"
  | "Slant Board"
  | "Sledge Hammer"
  | "Suspension Trainer"
  | "Weight Plate";

export type EquipmentSecondaryQty =
  | "0"
  | "1"
  | "2";

export type Posture =
  | "90/90 Seated"
  | "Bridge"
  | "Half Kneeling"
  | "Hanging"
  | "Horse Stance"
  | "Inverted"
  | "Knee Hover Quadruped"
  | "Knee Over Toe Split Squat"
  | "Knee Supported"
  | "Kneeling"
  | "L Sit"
  | "March"
  | "Other"
  | "Prone"
  | "Quadruped"
  | "Seated"
  | "Seated Floor"
  | "Shin Box Seated"
  | "Side Lying"
  | "Side Plank"
  | "Single Leg Bridge"
  | "Single Leg Standing"
  | "Single Leg Standing Bent Knee"
  | "Single Leg Supported"
  | "Split Squat"
  | "Split Squat Isometric"
  | "Staggered Stance"
  | "Standing"
  | "Supine"
  | "Tall Kneeling"
  | "Toe Balance"
  | "Tuck L Sit"
  | "V Sit Seated"
  | "Walking"
  | "Wall Sit";

export type ArmType =
  | "Double Arm"
  | "No Arms"
  | "Single Arm";

export type ArmMode =
  | "Alternating"
  | "Continuous";

export type Grip =
  | "Bottoms Up"
  | "Bottoms Up Horn Grip"
  | "Crush Grip"
  | "False Grip"
  | "Fingertip"
  | "Flat Palm"
  | "Forearm"
  | "Goblet"
  | "Hand Assisted"
  | "Head Supported"
  | "Horn Grip"
  | "Mixed Grip"
  | "Neutral"
  | "No Grip"
  | "Other"
  | "Pronated"
  | "Supinated"
  | "Waiter Hold";

export type LoadPosition =
  | "Above Chest"
  | "Back Rack"
  | "Bear Hug"
  | "Behind Back"
  | "Front Rack"
  | "Hip Crease"
  | "Lateral"
  | "Low Hold"
  | "No Load"
  | "Order"
  | "Other"
  | "Overhead"
  | "Shoulder"
  | "Suitcase"
  | "Zercher";

export type LegMode =
  | "Alternating"
  | "Continuous";

export type FootElevation =
  | "Feet Elevated"
  | "Foot Elevated"
  | "Foot Elevated (Front)"
  | "Foot Elevated (Lateral)"
  | "Foot Elevated (Rear)"
  | "Foot Elevated (Side)"
  | "Heels Elevated"
  | "No Elevation"
  | "Toes Elevated";

export type ComboType =
  | "Combo Exercise"
  | "Single Exercise";

export type Pattern1 =
  | "Ankle Dorsiflexion"
  | "Ankle Plantar Flexion"
  | "Anti-Extension"
  | "Anti-Flexion"
  | "Anti-Lateral Flexion"
  | "Anti-Rotational"
  | "Elbow Extension"
  | "Elbow Flexion"
  | "Hip Abduction"
  | "Hip Adduction"
  | "Hip Dominant"
  | "Hip Extension"
  | "Hip External Rotation"
  | "Hip Flexion"
  | "Hip Hinge"
  | "Horizontal Pull"
  | "Horizontal Push"
  | "Isometric Hold"
  | "Knee Dominant"
  | "Lateral Flexion"
  | "Loaded Carry"
  | "Rotational"
  | "Scapular Elevation"
  | "Shoulder Abduction"
  | "Shoulder External Rotation"
  | "Shoulder Flexion"
  | "Shoulder Internal Rotation"
  | "Shoulder Scapular Plane Elevation"
  | "Spinal Extension"
  | "Spinal Flexion"
  | "Unsorted*"
  | "Vertical Pull"
  | "Vertical Push"
  | "Wrist Extension"
  | "Wrist Flexion";

export type Pattern2 =
  | "Anti-Extension"
  | "Anti-Lateral Flexion"
  | "Anti-Rotational"
  | "Elbow Flexion"
  | "Hip Abduction"
  | "Hip Extension"
  | "Hip External Rotation"
  | "Hip Hinge"
  | "Horizontal Pull"
  | "Horizontal Push"
  | "Isometric Hold"
  | "Knee Dominant"
  | "Other"
  | "Rotational"
  | "Spinal Flexion"
  | "Spinal Rotational"
  | "Vertical Push";

export type Pattern3 =
  | "Anti-Extension"
  | "Anti-Lateral Flexion"
  | "Hip Hinge"
  | "Hip Internal Rotation"
  | "Horizontal Pull"
  | "Isometric Hold"
  | "Knee Dominant"
  | "Vertical Push";

export type Plane1 =
  | "Frontal Plane"
  | "Sagittal Plane"
  | "Transverse Plane";

export type Plane2 =
  | "Frontal Plane"
  | "Sagittal Plane"
  | "Transverse Plane";

export type Plane3 =
  | "Sagittal Plane";

export type Region =
  | "Full Body"
  | "Lower Body"
  | "Midsection"
  | "Unsorted*"
  | "Upper Body";

export type ForceType =
  | "Other"
  | "Pull"
  | "Push"
  | "Push & Pull"
  | "Unsorted*";

export type Mechanics =
  | "Compound"
  | "Isolation"
  | "Pull";

export type Laterality =
  | "Bilateral"
  | "Contralateral"
  | "Ipsilateral"
  | "Unilateral";

export type Category =
  | "Animal Flow"
  | "Balance"
  | "Ballistics"
  | "Bodybuilding"
  | "Calisthenics"
  | "Grinds"
  | "Mobility"
  | "Olympic Weightlifting"
  | "Plyometric"
  | "Postural"
  | "Powerlifting"
  | "Unsorted*";
