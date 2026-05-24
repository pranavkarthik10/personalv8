"use client";

import { Badge } from "@/components/ui/badge";
import { GitHubLogo } from "@/components/github-logo";
import { ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  imagePath?: string;
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  keyFeatures?: string[];
  inProgress?: boolean;
  year: number;
  challenges?: string;
  collaborators?: {
    name: string;
    portfolio?: string;
    twitter?: string;
  }[];
  awards?: string[];
  kind?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card group block cursor-pointer overflow-hidden rounded-md border border-border bg-card transition duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-secondary/70 active:scale-[0.96]"
    >
      <div className="p-3">
        <div className="mb-4 h-36 w-full overflow-hidden rounded-sm bg-muted sm:h-40">
          {project.imagePath ? (
            <Image
              src={project.imagePath}
              alt={`${project.name} screenshot`}
              width={400}
              height={300}
              className="image-outline h-full w-full object-cover object-top opacity-90 saturate-[0.85] transition duration-300 ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:saturate-100"
            />
          ) : (
            <div className="flex h-36 w-full items-center justify-center bg-muted sm:h-40">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 px-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {project.year}
            </p>
            <h3 className="mt-2 text-base font-medium leading-tight">
            {project.name}
          </h3>
          </div>
          <div className="flex items-center gap-2">
            {project.inProgress && (
              <Badge variant="outline" className="rounded-sm border-border bg-transparent text-xs text-muted-foreground">
                In Progress
              </Badge>
            )}
          </div>
        </div>

        <p className="mb-4 mt-3 line-clamp-3 px-1 text-xs leading-5 text-muted-foreground">
          {project.description}
        </p>

        {/* Awards */}
        {/* {project.awards && project.awards.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {project.awards.slice(0, 1).map((award) => (
                <Badge key={award} variant="outline" className="text-xs text-amber-700 border-amber-300 bg-amber-50">
                  🏆 {award}
                </Badge>
              ))}
              {project.awards.length > 1 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{project.awards.length - 1} more
                </Badge>
              )}
            </div>
          </div>
        )} */}

        {/* Collaborators */}
        {/* {project.collaborators && project.collaborators.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-muted-foreground">
              With: {project.collaborators.slice(0, 2).map(c => c.name).join(", ")}
              {project.collaborators.length > 2 && ` +${project.collaborators.length - 2} more`}
            </div>
          </div>
        )} */}
        
        {/* Tech Stack */}
        {project.awards && project.awards.length > 0 && (
          <p className="mb-4 px-1 text-xs text-[hsl(var(--accent))]">
            🏆 {project.awards.join(", ")}
          </p>
        )}

        <div className="mb-2 flex flex-wrap gap-x-3 gap-y-2 px-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-4 flex justify-end border-t border-border px-1 pt-2">
            <div className="flex items-center gap-2 opacity-40 transition-opacity group-hover:opacity-100">
              {project.githubUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-1 transition-colors hover:text-[hsl(var(--accent))]"
                  title="View on GitHub"
                >
                  <GitHubLogo className="h-4 w-4" />
                </button>
              )}
              {project.liveUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-1 transition-colors hover:text-[hsl(var(--accent))]"
                  title="Visit"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
