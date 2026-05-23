import { stitch } from '@google/stitch-sdk';

async function main() {
  try {
    const project = stitch.project('15996728507837142071');
    const screen = project.screen('5ee4cf07d90242368e3880774febc796');
    const htmlUrl = await screen.getHtml();
    console.log('HTML URL:', htmlUrl);
  } catch (e) {
    console.error('Error fetching HTML URL:', e);
  }
}
main();
