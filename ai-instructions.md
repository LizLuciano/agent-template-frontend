In every prompt where you will generate frontend elements, prioritize the created components, then the shadcn ui components and if needed install a new component from the shadcn ui library.

For any primary color, take into account the property primary_color saved in the localhost config object first.

For api consumption prioritize the api_url property saved in the localhost config object first, with the api_token property for authentication.

If a new page is added, also add a link in the components/app-sidebar.tsx file, keeping the Chat as first and the Settings as last unless otherwise stated.

