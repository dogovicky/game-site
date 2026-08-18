import { spawnSync } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const checks = [
  ['lint', 'lint'],
  ['typecheck', 'typecheck'],
  ['tests', 'test:ci'],
  ['build', 'build'],
];

for (const [name, script] of checks) {
  console.log(`\n>>> npm run ${script}`);
  const result = spawnSync(npmCommand, ['run', script], {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    console.error(`Unable to run ${name}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`Verification stopped after ${name}.`);
    process.exit(result.status ?? 1);
  }
}

console.log('\nAll verification checks passed.');
