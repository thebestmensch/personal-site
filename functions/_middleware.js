export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === "blog.thespenschs.com") {
    return Response.redirect("https://jamesmensch.com/writing", 301);
  }
  return next();
};
