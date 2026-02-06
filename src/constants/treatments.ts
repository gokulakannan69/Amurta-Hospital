import { Building2, Home, Video } from 'lucide-react';
import type { Treatment, ServiceMode } from '../types';

export const PANCHAKARMA_TREATMENTS: Treatment[] = [
    { tm: 'அப்யங்கம்', en: 'Abhyangam', descTm: 'முழு உடல் மூலிகை எண்ணெய் மசாஜ்', descEn: 'Full body herbal oil massage' },
    { tm: 'ஸ்வேதனம்', en: 'Swedanam', descTm: 'மூலிகை ஆவி சிகிச்சை', descEn: 'Herbal steam therapy' },
    { tm: 'பொடி கிழி', en: 'Podi Kizhi', descTm: 'மூலிகை பொடி ஒத்தடம்', descEn: 'Herbal powder bolus massage' },
    { tm: 'சிரோதாரா', en: 'Shirodhara', descTm: 'நெற்றியில் மூலிகை எண்ணெய் தாரை', descEn: 'Continuous oil pour on forehead' },
    { tm: 'பிழிச்சில்', en: 'Pizhichil', descTm: 'மிதமான சூட்டில் எண்ணெய் குளியல்', descEn: 'Squeeze massage with warm oil' },
    { tm: 'நசியம்', en: 'Nasyam', descTm: 'மூக்கு வழியாக மருந்து செலுத்துதல்', descEn: 'Nasal administration of medicine' },
];

export const SERVICE_MODES: ServiceMode[] = [
    { id: 'clinic', tm: 'கிளினிக் வருகை', en: 'Clinic Visit', icon: Building2 },
    { id: 'home', tm: 'வீட்டு சிகிச்சை', en: 'Home Service', icon: Home },
    { id: 'online', tm: 'ஆன்லைன் ஆலோசனை', en: 'Online Consultation', icon: Video },
];
