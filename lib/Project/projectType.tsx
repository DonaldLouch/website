interface ProjectTypeProps {
    id: string
    smallText: string
    fullText: string|null
}

export const ProjectType: Array<ProjectTypeProps> = [
    { 
        id: 'new',
        smallText: 'New Website',
        fullText: null,
    },
    { 
        id: 'upgrade',
        smallText: 'Upgrade Website',
        fullText: 'Upgrade a Current Website',
    },
    { 
        id: 'installDL',
        smallText: 'Install Script: Donald Louch',
        fullText: 'Install a Donald Louch Script',
    },
    { 
        id: 'installO',
        smallText: 'Install Script: Other',
        fullText: 'Install Any Script',
    },
    { 
        id: 'help',
        smallText: 'Coding Help',
        fullText: null,
    },
    { 
        id: 'other',
        smallText: 'Other',
        fullText: null,
    },
]