import firebaseIcon from '../assets/svgs/firebase.svg';

export const normalizeMediaList = (media: unknown, fallback: string[] = ['/project-assets/depi-cover-focused.png']) => {
    const list = Array.isArray(media) ? media : Object.values((media || {}) as Record<string, unknown>);
    const normalized = list
        .filter((item): item is string => typeof item === 'string')
        .map(item => item.trim())
        .filter(Boolean);

    return normalized.length > 0 ? normalized : fallback;
};

export const isVideoFile = (url: unknown) => {
    if (typeof url !== 'string') return false;
    return url.split('?')[0].toLowerCase().match(/\.(mp4|webm|ogg|mov)$/) || url.includes('/videos/');
};

export const getStackIcon = (name: unknown) => {
    const lowerName = typeof name === 'string' ? name.toLowerCase() : '';
    if (lowerName.includes('firebase')) return firebaseIcon;
    if (lowerName.includes('databricks')) return '/icons/azure-databricks.svg';
    return null;
};

export const getTechColor = (name: unknown) => {
    const lower = typeof name === 'string' ? name.toLowerCase() : '';
    if (lower.includes('react')) return '#61dafb';
    if (lower.includes('html')) return '#e34f26';
    if (lower.includes('css')) return '#1572b6';
    if (lower.includes('js') || lower.includes('javascript')) return '#f7df1e';
    if (lower.includes('node')) return '#339933';
    if (lower.includes('firebase')) return '#ffca28';
    if (lower.includes('databricks')) return '#ff3621';
    if (lower.includes('typescript') || lower.includes('ts')) return '#3178c6';
    if (lower.includes('tailwind')) return '#06b6d4';
    return '#60a5fa';
};
