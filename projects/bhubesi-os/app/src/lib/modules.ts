export interface OSModule {
  id: string;
  label: string;
  status: "active" | "soon";
}

export const modules: OSModule[] = [
  { id: "ai-chat", label: "AI Chat", status: "active" },
  { id: "crm", label: "CRM", status: "soon" },
  { id: "project-management", label: "Project Management", status: "soon" },
  { id: "document-management", label: "Document Management", status: "soon" },
  { id: "finance", label: "Finance", status: "soon" },
  { id: "media-asset-library", label: "Media Asset Library", status: "soon" },
  { id: "research-database", label: "Research Database", status: "soon" },
  { id: "knowledge-search", label: "Knowledge Search", status: "soon" },
  { id: "automation-hub", label: "Automation Hub", status: "soon" },
];
