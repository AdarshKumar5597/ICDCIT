import Image from 'next/image';

interface Member {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

interface MembersSectionProps {
    members: Member[];
}

export const MembersSection: React.FC<MembersSectionProps> = ({ members }) => {
    return (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Members</h4>
            <div className="space-y-2">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl border-b transition-all duration-200 cursor-pointer group"
                    >
                        <Image
                            width={1000}
                            height={1000}
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white group-hover:ring-blue-100"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{member.name}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${member.role === 'Admin'
                                    ? 'bg-blue-100 text-blue-700'
                                    : member.role === 'Moderator'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {member.role}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
