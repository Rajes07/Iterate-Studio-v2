import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProjectPage } from "@/components/project-page";
import { getProject, type Project, type ProjectContent } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  beforeLoad: ({ params }) => {
    const project = getProject(params.slug);
    if (!project || project.type !== "internal" || !project.content) throw redirect({ to: "/", hash: "work" });
    return { project: project as Project & { content: ProjectContent } };
  },
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [{ title: `${project?.name ?? "Project"} — Concept by Iterate Studio` }, { name: "description", content: project?.tagline ?? "" }],
      links: project?.content ? [{ rel: "stylesheet", href: project.content.theme.font.url }] : [],
    };
  },
  component: WorkProject,
});

function WorkProject() {
  const { project } = Route.useRouteContext();
  return <ProjectPage project={project} />;
}
