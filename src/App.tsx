import React, { useState } from 'react';
import {
    Calendar,
    Leaf,
    X,
    ChevronRight,
    Activity,
    Droplets,
    CheckCircle2,
    ChevronLeft,
    Users,
    Home,
    Video,
    Building2,
    HeartPulse,
    Flower2,
    Loader2,
    ClipboardList,
    Phone,
    Languages
} from 'lucide-react';
import { AGLogo } from './components/AGLogo';
import { TRANSLATIONS } from './constants/translations';
import { PANCHAKARMA_TREATMENTS, SERVICE_MODES } from './constants/treatments';
import { BOOKING_SERVICES } from './constants/services';
import { AUTOMATION_CONFIG, DOCTOR_IMAGE_URL } from './constants/config';
import type { BookingData, Language, TabType } from './types';

const App = () => {
    const [lang, setLang] = useState<Language>('tm');
    const [activeTab, setActiveTab] = useState<TabType>('home');
    const [bookingStep, setBookingStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData>({
        mode: '',
        service: '',
        date: '',
        time: '',
        name: '',
        phone: '',
    });

    const t = TRANSLATIONS[lang];

    const toggleLang = () => setLang(prev => prev === 'tm' ? 'en' : 'tm');
    const nextStep = () => setBookingStep(prev => prev + 1);
    const prevStep = () => setBookingStep(prev => prev - 1);
    const closeBooking = () => {
        setBookingStep(0);
        setIsSuccess(false);
        setIsSubmitting(false);
        setBookingData({ mode: '', service: '', date: '', time: '', name: '', phone: '' });
    };

    const finalizeBooking = async () => {
        if (!bookingData.name || !bookingData.phone) return;
        setIsSubmitting(true);

        const params = new URLSearchParams({
            name: bookingData.name,
            phone: bookingData.phone,
            mode: bookingData.mode,
            service: bookingData.service,
            date: bookingData.date,
            time: bookingData.time
        });

        // Add timestamp to prevent caching
        params.append('_t', new Date().getTime().toString());

        const fullUrl = `${AUTOMATION_CONFIG.scriptUrl}?${params.toString()}`;
        console.log("Submitting to Google Script:", fullUrl);

        try {
            await fetch(fullUrl, {
                method: 'GET',
                mode: 'no-cors'
                // Removed headers to avoid preflight options request
            });

            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            }, 2000);
        } catch (error) {
            console.error("Submission Error:", error);
            setIsSubmitting(false);
            alert(t.registrationError);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fbff] text-slate-900 flex flex-col">
            {/* Header */}
            <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm safe-top">
                <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AGLogo className="w-10 h-10 md:w-12 md:h-12" />
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-blue-900 tracking-tight leading-none uppercase">{t.hospitalName}</h1>
                            <p className="text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">{t.hospitalSubtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className="p-3 bg-blue-50 text-blue-900 rounded-2xl flex items-center gap-2 hover:bg-blue-100 transition-colors"
                            title="Change Language"
                        >
                            <Languages className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'tm' ? 'English' : 'தமிழ்'}</span>
                        </button>
                        <button
                            onClick={() => setBookingStep(1)}
                            className="hidden md:flex px-6 py-3 bg-blue-900 text-white rounded-2xl font-bold text-xs shadow-lg items-center gap-2 uppercase tracking-widest transition-transform active:scale-95"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>{t.bookNow}</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 md:px-8 pt-6 pb-32 max-w-5xl">
                {activeTab === 'home' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                        {/* Dr. Profile Section */}
                        <section className="bg-white rounded-[2.5rem] border border-blue-50/50 p-6 md:p-12 flex flex-col md:flex-row gap-10 items-center shadow-xl shadow-blue-900/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -mr-24 -mt-24 opacity-40"></div>
                            <div className="relative z-10 w-full max-w-[300px] md:w-80 aspect-[4/5] rounded-[3rem] border-4 border-white shadow-2xl overflow-hidden flex-shrink-0 bg-white group">
                                <img
                                    src={DOCTOR_IMAGE_URL}
                                    className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                                    alt="Dr. Girija Portrait"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                    {t.specializedIntake}
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-4xl md:text-6xl font-extrabold text-blue-950 tracking-tighter leading-tight">
                                        {t.drName} <span className="text-xl md:text-2xl font-medium text-slate-300 block md:inline mt-1 md:mt-0">BAMS.,</span>
                                    </h2>
                                    <p className="text-xl md:text-2xl font-bold text-emerald-700 leading-tight">{t.drTitle}</p>
                                </div>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl font-medium">
                                    {t.heroDesc}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                    <button onClick={() => setBookingStep(1)} className="px-10 py-5 bg-blue-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-blue-950 flex items-center gap-2 transition-all active:scale-95">
                                        {t.startRegistration} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Quick Badges */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
                            {[
                                { icon: HeartPulse, label: t.nadiDiagnosis },
                                { icon: Flower2, label: t.panchakarma },
                                { icon: Activity, label: t.realTimeSync },
                                { icon: Building2, label: t.harurCenter }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center gap-4 text-center group hover:border-blue-200 hover:shadow-xl transition-all">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-900 group-hover:text-white transition-all">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-[10px] font-black text-blue-950 uppercase tracking-widest leading-none">{item.label}</span>
                                </div>
                            ))}
                        </section>
                    </div>
                )}

                {activeTab === 'treatments' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="text-center space-y-4 pb-8 border-b border-slate-100">
                            <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">{t.therapyProtocols}</h2>
                            <p className="text-sm md:text-lg text-emerald-700 font-bold italic">{t.therapySubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PANCHAKARMA_TREATMENTS.map(item => (
                                <div key={item.en} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all group">
                                    <div className="flex items-start gap-6 mb-8">
                                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                            <Droplets className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 text-xl leading-tight">{lang === 'tm' ? item.tm : item.en}</h4>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{lang === 'tm' ? item.en : item.tm}</p>
                                            <p className="text-sm text-slate-600 mt-5 font-bold leading-relaxed">{lang === 'tm' ? item.descTm : item.descEn}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setBookingData(prev => ({ ...prev, service: lang === 'tm' ? item.tm : item.en })); setBookingStep(1); }} className="w-full py-6 bg-blue-50 text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all flex items-center justify-center gap-2">
                                        {t.chooseTherapy} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
                        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 p-8 md:p-20 text-white relative">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                    <div className="w-64 h-80 rounded-[3rem] overflow-hidden border-[10px] border-white/10 shadow-3xl bg-white flex-shrink-0">
                                        <img src={DOCTOR_IMAGE_URL} className="w-full h-full object-contain object-bottom" alt="Dr. Girija Profile" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-5">
                                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{t.drName}</h2>
                                        <p className="text-xl md:text-3xl font-bold text-emerald-400">B.A.M.S., {t.clinicalDirector}</p>
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
                                            <span className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{t.medicalHead}</span>
                                            <span className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{t.harur}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 md:p-20 space-y-12 text-center md:text-left">
                                <p className="text-xl font-medium text-slate-600 leading-relaxed italic">
                                    {t.profileDesc}
                                </p>
                                <button onClick={() => setBookingStep(1)} className="w-full py-8 bg-blue-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl transition-transform active:scale-95">{t.startConsult}</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Booking Dialog Modal */}
            {bookingStep > 0 && (
                <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-lg bg-white rounded-t-[3rem] md:rounded-[3rem] shadow-3xl overflow-hidden relative animate-in slide-in-from-bottom-full md:slide-in-from-bottom-0 duration-500">
                        <button onClick={closeBooking} className="absolute right-8 top-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-[210]">
                            <X className="w-5 h-5 text-slate-600" />
                        </button>

                        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
                            {isSuccess ? (
                                <div className="p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-4xl font-black text-blue-950 tracking-tighter leading-none">{t.saved}</h3>
                                        <p className="text-slate-500 font-bold leading-relaxed px-4">{t.successMsg}</p>
                                        <p className="text-blue-900 font-black text-xl">{bookingData.name}</p>
                                    </div>
                                    <button onClick={closeBooking} className="w-full py-7 bg-blue-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform">{t.returnToHub}</button>
                                </div>
                            ) : isSubmitting ? (
                                <div className="p-20 text-center space-y-8">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
                                        <Loader2 className="w-24 h-24 text-blue-900 animate-spin absolute inset-0" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-blue-950 leading-none">{t.recordingData}</h3>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 md:p-12 space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20"><ClipboardList className="w-8 h-8" /></div>
                                        <div>
                                            <h3 className="text-3xl font-black text-blue-950 tracking-tighter leading-none">{t.intake}</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{t.section} {bookingStep} {t.of} 4</p>
                                        </div>
                                    </div>

                                    {bookingStep === 1 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-8">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.consultationFormat}</p>
                                            <div className="grid gap-3">
                                                {SERVICE_MODES.map(m => (
                                                    <button
                                                        key={m.id}
                                                        onClick={() => { setBookingData(prev => ({ ...prev, mode: lang === 'tm' ? m.tm : m.en })); nextStep(); }}
                                                        className={`w-full p-6 text-left rounded-3xl border-2 transition-all flex items-center justify-between group ${bookingData.mode === (lang === 'tm' ? m.tm : m.en) ? 'border-blue-900 bg-blue-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className={`p-5 rounded-2xl transition-colors ${bookingData.mode === (lang === 'tm' ? m.tm : m.en) ? 'bg-blue-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}><m.icon className="w-7 h-7" /></div>
                                                            <div>
                                                                <p className="font-black text-xl text-blue-950">{lang === 'tm' ? m.tm : m.en}</p>
                                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{lang === 'tm' ? m.en : m.tm}</p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className={`w-6 h-6 transition-all ${bookingData.mode === (lang === 'tm' ? m.tm : m.en) ? 'text-blue-900 translate-x-1' : 'text-slate-200'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {bookingStep === 2 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-8">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.treatmentSpecialty}</p>
                                            <div className="grid grid-cols-1 gap-2.5">
                                                {BOOKING_SERVICES.map(s => (
                                                    <button
                                                        key={s.en}
                                                        onClick={() => { setBookingData(prev => ({ ...prev, service: lang === 'tm' ? s.tm : s.en })); nextStep(); }}
                                                        className={`w-full p-6 text-left rounded-2xl border-2 font-black text-base transition-all ${bookingData.service === (lang === 'tm' ? s.tm : s.en) ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                                                    >
                                                        {lang === 'tm' ? s.tm : s.en}
                                                    </button>
                                                ))}
                                            </div>
                                            <button onClick={prevStep} className="w-full py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:text-blue-900"><ChevronLeft className="w-4 h-4" /> {t.back}</button>
                                        </div>
                                    )}

                                    {bookingStep === 3 && (
                                        <div className="space-y-10 animate-in slide-in-from-right-8">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.visitDate}</p>
                                                <input type="date" className="w-full p-7 rounded-[2rem] border-2 border-slate-100 font-black text-xl focus:ring-4 focus:ring-blue-50 outline-none transition-all" onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))} />
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.timeSlot}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {[t.morning, t.evening].map(slot => (
                                                        <button key={slot} onClick={() => setBookingData(prev => ({ ...prev, time: slot }))} className={`p-7 rounded-3xl border-2 text-[10px] font-black transition-all ${bookingData.time === slot ? 'bg-blue-950 text-white border-blue-950 shadow-2xl scale-105' : 'border-slate-100 bg-white'}`}>{slot}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={prevStep} className="flex-1 py-7 bg-slate-100 rounded-[2rem] font-black text-[10px] uppercase tracking-widest">{t.back}</button>
                                                <button onClick={nextStep} disabled={!bookingData.date || !bookingData.time} className="flex-[2] py-7 bg-blue-900 text-white rounded-[2rem] font-black text-[10px] uppercase shadow-2xl disabled:opacity-50 tracking-widest transition-transform active:scale-95">{t.next}</button>
                                            </div>
                                        </div>
                                    )}

                                    {bookingStep === 4 && (
                                        <div className="space-y-10 animate-in slide-in-from-right-8">
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.patientName}</p>
                                                    <input type="text" placeholder={t.fullName} className="w-full p-8 rounded-[2rem] border-2 border-slate-100 font-black text-xl focus:ring-4 focus:ring-blue-50 outline-none transition-all" value={bookingData.name} onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))} />
                                                </div>
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.phoneNumber}</p>
                                                    <div className="relative">
                                                        <Phone className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                                                        <input type="tel" placeholder={t.mobileNo} className="w-full pl-20 p-8 rounded-[2rem] border-2 border-slate-100 font-black text-xl focus:ring-4 focus:ring-blue-50 outline-none transition-all" value={bookingData.phone} onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={finalizeBooking} disabled={!bookingData.name || !bookingData.phone} className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-5 hover:bg-emerald-700 disabled:opacity-50 uppercase tracking-tighter transition-all active:scale-95">
                                                {t.registerSync} <CheckCircle2 className="w-8 h-8" />
                                            </button>
                                            <button onClick={prevStep} className="w-full py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:text-blue-900"><ChevronLeft className="w-4 h-4" /> {t.back}</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Persistent Bottom Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-3xl border-t border-slate-100 px-8 py-6 flex justify-center safe-bottom">
                <div className="container mx-auto max-w-lg flex items-center justify-around">
                    {[
                        { id: 'home', icon: Activity, label: t.hub },
                        { id: 'treatments', icon: Leaf, label: t.care },
                        { id: 'profile', icon: Users, label: t.doctor },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex flex-col items-center gap-2.5 transition-all relative ${activeTab === tab.id ? 'text-blue-900 scale-110 font-black' : 'text-slate-300'}`}
                        >
                            <div className={`p-4 rounded-[1.2rem] transition-all duration-500 ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-2xl shadow-blue-900/40 -translate-y-2' : 'bg-transparent hover:bg-slate-50'}`}>
                                <tab.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-40'}`}>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default App;
