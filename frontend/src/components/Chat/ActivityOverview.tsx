import { Community } from "@/types/types";

interface ActivityOverviewProps {
    currentCommunity: Community;
}

export const ActivityOverview: React.FC<ActivityOverviewProps> = ({ currentCommunity }) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-2xl border border-blue-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Activity Overview</h4>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                        {currentCommunity.members.length} Active Members
                    </span>
                </div>
            </div>
        </div>
    );
};
