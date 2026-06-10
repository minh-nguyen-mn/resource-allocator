import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

faker.seed(42);
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const activities = Array.from({ length: 100 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.helpers.arrayElement(['Sauna', 'Dexa Scan', 'Consultation', 'Therapy']),
  category: faker.helpers.arrayElement(['fitness', 'nutrition', 'therapy']),
  priority: faker.number.int({ min: 1, max: 5 }),
  frequency: faker.helpers.arrayElement(['daily', 'weekly', 'monthly']),
  occurrencesPerPeriod: faker.number.int({ min: 1, max: 5 }),
  durationMinutes: faker.helpers.arrayElement([30, 45, 60, 90]),
  locationType: faker.helpers.arrayElement(['home', 'clinic', 'gym', 'virtual']),
  remoteAllowed: faker.datatype.boolean(),
  requiredEquipment: [],
  backupActivities: []
}));

fs.writeFileSync(path.join(dataDir, 'activities.json'), JSON.stringify(activities, null, 2));
console.log('Generated 100 synthetic activities.');