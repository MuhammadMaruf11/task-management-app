import ViewTaskPage from "@/components/Task/ViewTask/ViewTask";

interface PageProps {
    params: { id: string };
}

export default function TaskPage({ params }: PageProps) {
    return <ViewTaskPage taskId={params.id} />;
}
