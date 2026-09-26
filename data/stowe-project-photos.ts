export type StoweProjectPhoto = { src: string; width: number; height: number; alt: string; title: string; description?: string; source?: string };

const originalPhotos: StoweProjectPhoto[] = [
  {
    "src": "/media/original-stowe/stowe-driveway-original.jpg",
    "width": 800,
    "height": 600,
    "alt": "Paver driveway bordered by flowering plants leading to a garage.",
    "title": "Paver driveways"
  },
  {
    "src": "/media/original-stowe/stowe-patio-original.jpg",
    "width": 800,
    "height": 600,
    "alt": "Paver patio with stone fire pit, plant pots, and hillside view.",
    "title": "Patios & outdoor spaces"
  },
  {
    "src": "/media/original-stowe/stowe-retaining-wall-original.jpg",
    "width": 600,
    "height": 783,
    "alt": "Curved block retaining walls and planting beds in front of a house.",
    "title": "Retaining walls"
  },
  {
    "src": "/media/original-stowe/stowe-grading-original.jpg",
    "width": 450,
    "height": 600,
    "alt": "Excavator on an earth slope beside a partially visible tank.",
    "title": "Grading & site preparation"
  },
  {
    "src": "/media/original-stowe/stowe-project-img-0204-original.jpg",
    "width": 600,
    "height": 450,
    "alt": "Excavator and skid steer working inside a large excavation.",
    "title": "Earthwork"
  },
  {
    "src": "/media/original-stowe/stowe-project-pict0002-original.jpg",
    "width": 435,
    "height": 600,
    "alt": "Curved block retaining wall beside a paver patio and wooded slope.",
    "title": "Construction & hardscape"
  },
  {
    "src": "/media/original-stowe/stowe-grass-front-view-original.jpg",
    "width": 1400,
    "height": 844,
    "alt": "Front lawn with curved paver walkway leading to a house.",
    "title": "Synthetic grass"
  }
];

export const stoweFeaturedPhotos = originalPhotos.slice(0, 3);
export const stoweProjectPhotos: StoweProjectPhoto[] = [
...[
  {
    "src": "/media/facebook-stowe/rancho-cielo-courtyard.jpg",
    "width": 2048,
    "height": 1536,
    "title": "Rancho Cielo School \u2014 courtyard",
    "alt": "Expansive paver courtyard with dark border detailing at Rancho Cielo School.",
    "description": "A broad paved gathering area, with contrasting edge courses and carefully finished transitions.",
    "source": "https://www.facebook.com/photo/?fbid=1608749927929410&set=a.466575485480199"
  },
  {
    "src": "/media/facebook-stowe/rancho-cielo-inlay.jpg",
    "width": 2048,
    "height": 1536,
    "title": "Rancho Cielo School \u2014 custom inlay",
    "alt": "Circular dark-brick inlay with contrasting RC initials within a paver courtyard.",
    "description": "Stowe identifies this custom work as a Belgard permeable Quarrystone field with a Brooklyn circle and accent.",
    "source": "https://www.facebook.com/photo/?fbid=1608748141262922&set=a.466575485480199"
  },
  {
    "src": "/media/facebook-stowe/curved-garden-walls.jpg",
    "width": 2048,
    "height": 1468,
    "title": "Curved garden walls",
    "alt": "Curved masonry garden walls with capped piers and planting beside a home.",
    "description": "Sweeping curves, stepped heights and planted spaces bring structure to this garden frontage.",
    "source": "https://www.facebook.com/photo/?fbid=1608750904595979&set=a.466575485480199"
  }
],
...originalPhotos
];
