export const MAX_IDEA_LENGTH = 150;

export const GROUPED_CONTENT_TYPES = [
    {
        group: 'Social Media',
        types: [
            'Instagram Post', 'Instagram Story', 'Instagram Reel', 'TikTok Video', 'Twitter/X Post', 'LinkedIn Post', 'LinkedIn Article', 'Facebook Post', 'Facebook Ad', 'YouTube Title', 'YouTube Description', 'YouTube Community Post', 'Pinterest Pin', 'Snapchat Story', 'Threads Post'
        ]
    },
    {
        group: 'Video & Audio',
        types: [
            'Short Video (general)', 'Long-form YouTube Video', 'Podcast Title', 'Podcast Episode Description', 'Webinar Title', 'Webinar Invitation', 'Online Course Promo'
        ]
    },
    {
        group: 'Written Content',
        types: [
            'Blog Post Title', 'Blog Post Introduction', 'Newsletter Subject Line', 'Newsletter Opening Line', 'Whitepaper / Report Title', 'Case Study Title', 'eBook Title', 'Landing Page Headline', 'Landing Page Subheadline'
        ]
    },
    {
        group: 'Marketing & Sales',
        types: [
            'Email Subject Line', 'Email Body Intro', 'Cold Outreach Email Hook', 'Sales Page Headline', 'Product Description', 'Press Release Headline', 'Event Invitation Hook', 'Ad Headline (Google Ads / Meta Ads)', 'Banner Ad Copy'
        ]
    },
    {
        group: 'Community & Engagement',
        types: [
            'Discord Announcement', 'Slack Update', 'Forum Post', 'Community Poll Hook', 'Survey Invitation'
        ]
    },
    {
        group: 'Other',
        types: [
            'App Push Notification', 'SMS Campaign Message', 'Resume / Portfolio Tagline', 'Personal Branding Bio Line', 'Course/Workshop Title', 'Event/Conference Title'
        ]
    }
] as const;

export const CONTENT_TYPES = GROUPED_CONTENT_TYPES.flatMap(group => group.types);
