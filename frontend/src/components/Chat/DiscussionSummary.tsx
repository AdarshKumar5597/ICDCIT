interface DiscussionSummaryProps {
    summary: string;
}

export const DiscussionSummary: React.FC<DiscussionSummaryProps> = ({ summary }) => {
    return (
        <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800">Discussion Summary</h4>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {summary}
            </p>
        </div>
    );
};
