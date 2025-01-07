export const communitiesData = [
    {
        id: 1,
        name: "Mental Health Support",
        image: "/images/chat/mentalhealth.png",
        summary: "Recent discussions focused on stress management techniques, mindfulness practices, and building healthy coping mechanisms. Members have been actively sharing their experiences and supporting each other. Topics include dealing with anxiety, depression, and other mental health challenges. The community also shares resources such as articles, videos, and personal stories to help each other.",
        members: [
            { id: 1, name: "Dr. Sarah Johnson", role: "Admin", avatar: "/images/chat/femaledoctor.png" },
            { id: 2, name: "Dr. Michael Brown", role: "Moderator", avatar: "/images/chat/drbrown.png" },
            { id: 3, name: "Jane Smith", role: "Member", avatar: "/images/chat/femaledoctor.png" }
        ],
        messages: [
            {
                id: 1,
                userId: 1,
                userName: "Dr. Sarah Johnson",
                userAvatar: "/images/chat/femaledoctor.png",
                content: "Welcome to our Mental Health Support group! How is everyone doing today? Remember, this is a safe space for sharing and support. 🌟",
                timestamp: "2024-01-06T09:00:00Z",
                isImage: false
            },
            {
                id: 2,
                userId: 2,
                userName: "Dr. Michael Brown",
                userAvatar: "/images/chat/drbrown.png",
                content: "/images/community.png",
                timestamp: "2024-01-06T09:05:00Z",
                isImage: true
            }
        ]
    },
    {
        id: 2,
        name: "Wellness & Exercise",
        image: "/images/chat/wellness.png",
        summary: "Group members have been sharing workout routines, discussing nutrition tips, and supporting each other's fitness goals. Recent topics include home workouts and healthy meal planning. Members also share their progress, motivational tips, and challenges they face in maintaining a healthy lifestyle. The community encourages each other to stay active and eat healthily.",
        members: [
            { id: 4, name: "Dr. Emily Davis", role: "Admin", avatar: "/images/chat/dremily.png" },
            { id: 5, name: "John Doe", role: "Member", avatar: "/images/patient.png" }
        ],
        messages: [
            {
                id: 1,
                userId: 4,
                userName: "Dr. Emily Davis",
                userAvatar: "/images/chat/dremily.png",
                content: "Let's discuss weekly exercise goals! 💪",
                timestamp: "2024-01-06T10:00:00Z",
                isImage: false
            }
        ]
    }
];