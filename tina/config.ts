import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: 'json',
        ui: {
          router: (props) => {
            return '/'
          }
        },
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'userImage',
            label: 'User Image',
            type: 'image',
          },
          {
            name: 'aboutme',
            label: 'About Me',
            type: 'rich-text',
          },
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
          {
            name: 'projects',
            label: 'Projects',
            description: 'Please enter the page filename of the projects that you want displayed on the homepage',
            type: 'string',
            list: true,
          },
          {
            name: 'videos',
            label: 'Videos',
            type: 'string',
            list: true,
          },
          {
            name: 'reviews',
            label: 'Reviews',
            description: 'Please enter the page filename of the reviews that you want displayed on the homepage',
            type: 'string',
            list: true,
          },
          {
            name: 'contact',
            label: "Contact",
            type: 'rich-text'
          },
          {
            name: 'discord',
            label: "Discord",
            type: 'string'
          },
          {
            name: 'github',
            label: "Github",
            type: 'string'
          },
          {
            name: 'githubLink',
            label: "Github Link",
            type: 'string'
          },
          {
            name: 'email',
            label: "Email",
            type: 'string'
          },
          
        ]
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: 'json',
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'description',
            label: 'Description',
            type: 'rich-text',
          },
          {
            name: 'image',
            label: 'Image',
            type: 'image',
            list: true,
          }
        ]
      },
      {
        name: "reviews",
        label: "Reviews",
        path: "content/reviews",
        format: 'json',
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'profile',
            label: 'Profile Picture',
            description: 'Image must be 256x256 pixels',
            type: 'image',
          },
          {
            name: 'tag',
            label: 'Tag',
            type: 'string',
          },
          {
            name: 'description',
            label: 'Description',
            type: 'rich-text',
          },
          
        ]
      }
    ],
  },
});
