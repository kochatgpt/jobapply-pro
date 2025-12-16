import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    Video, User, GraduationCap, Briefcase, HeartPulse, 
    FileText, Phone, MapPin, Calendar, Mail
} from "lucide-react";
import InfoGrid from './InfoGrid';

export default function ApplicantDetail({ applicant }) {
    if (!applicant) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50 p-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-slate-300" />
                </div>
                <p>เลือกรายชื่อผู้สมัครจากด้านซ้ายเพื่อดูรายละเอียด</p>
            </div>
        );
    }

    const { personal_data } = applicant;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/30">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white shadow-lg overflow-hidden shrink-0">
                        {applicant.photo_url ? (
                            <img src={applicant.photo_url} className="w-full h-full object-cover" alt={applicant.full_name} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-10 h-10 text-slate-300" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900">{applicant.full_name}</h1>
                            <Badge className={`
                                ${applicant.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                                ${applicant.status === 'accepted' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                ${applicant.status === 'rejected' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                            `}>
                                {applicant.status}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                            {personal_data?.mobile_phone && (
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" /> {personal_data.mobile_phone}
                                </div>
                            )}
                            {personal_data?.email && (
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" /> {personal_data.email}
                                </div>
                            )}
                            {applicant.submission_date && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" /> สมัครเมื่อ {applicant.submission_date}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    {applicant.video_response_url && (
                        <Button 
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                            onClick={() => window.open(applicant.video_response_url, '_blank')}
                        >
                            <Video className="w-4 h-4 mr-2" /> 
                            ดูวิดีโอสัมภาษณ์
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-8 max-w-5xl mx-auto">
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="w-full justify-start bg-white border border-slate-200 p-1 mb-6 h-auto flex-wrap">
                                <TabsTrigger value="personal" className="gap-2 px-4 py-2"><User className="w-4 h-4"/> ข้อมูลส่วนตัว</TabsTrigger>
                                <TabsTrigger value="family" className="gap-2 px-4 py-2"><User className="w-4 h-4"/> ครอบครัว</TabsTrigger>
                                <TabsTrigger value="education" className="gap-2 px-4 py-2"><GraduationCap className="w-4 h-4"/> การศึกษา & ทักษะ</TabsTrigger>
                                <TabsTrigger value="work" className="gap-2 px-4 py-2"><Briefcase className="w-4 h-4"/> ประสบการณ์ทำงาน</TabsTrigger>
                                <TabsTrigger value="health" className="gap-2 px-4 py-2"><HeartPulse className="w-4 h-4"/> สุขภาพ & อื่นๆ</TabsTrigger>
                            </TabsList>

                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <TabsContent value="personal" className="space-y-6 mt-0">
                                    <InfoGrid title="ข้อมูลพื้นฐาน" data={personal_data} icon={User} />
                                    <InfoGrid title="ที่อยู่" data={personal_data?.registered_address} icon={MapPin} />
                                </TabsContent>

                                <TabsContent value="family" className="space-y-6 mt-0">
                                    <InfoGrid title="สถานะครอบครัว" data={applicant.family_data} icon={User} />
                                    <InfoGrid title="ข้อมูลบิดา" data={applicant.parents_data?.father} icon={User} />
                                    <InfoGrid title="ข้อมูลมารดา" data={applicant.parents_data?.mother} icon={User} />
                                    <InfoGrid title="พี่น้อง" data={{siblings_count: applicant.parents_data?.siblings_count, birth_order: applicant.parents_data?.birth_order}} icon={User} />
                                </TabsContent>

                                <TabsContent value="education" className="space-y-6 mt-0">
                                    <InfoGrid title="ประวัติการศึกษา" data={applicant.education_data?.history} icon={GraduationCap} />
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InfoGrid title="ทักษะภาษา" data={applicant.skills_data?.languages} icon={FileText} />
                                        <InfoGrid title="ความสามารถอื่นๆ" data={{...applicant.skills_data?.driving, ...applicant.skills_data?.office}} icon={FileText} />
                                    </div>
                                    <InfoGrid title="ประวัติการฝึกอบรม" data={applicant.training_data} icon={GraduationCap} />
                                </TabsContent>

                                <TabsContent value="work" className="space-y-6 mt-0">
                                    <InfoGrid title="ประวัติการทำงาน" data={applicant.experience_data} icon={Briefcase} />
                                    <InfoGrid title="บุคคลอ้างอิง" data={applicant.referral_data} icon={User} />
                                </TabsContent>

                                <TabsContent value="health" className="space-y-6 mt-0">
                                    <InfoGrid title="ข้อมูลสุขภาพ" data={applicant.health_data} icon={HeartPulse} />
                                    <InfoGrid title="คำแถลงเพิ่มเติม" data={applicant.statement_data} icon={FileText} />
                                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-indigo-500"/>
                                            ลายเซ็นผู้สมัคร
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {applicant.signature_url && (
                                                <div className="border rounded-xl p-4 bg-slate-50 flex items-center justify-center min-h-[160px]">
                                                    <img src={applicant.signature_url} className="max-h-32 object-contain" alt="Signature" />
                                                </div>
                                            )}
                                            <div className="space-y-4 text-sm">
                                                <div className="flex justify-between border-b pb-2">
                                                    <span className="text-slate-500">วันที่ลงนาม</span>
                                                    <span className="font-medium">{applicant.signature_date}</span>
                                                </div>
                                                <div className="flex justify-between border-b pb-2">
                                                    <span className="text-slate-500">วันที่เริ่มงานได้</span>
                                                    <span className="font-medium">{applicant.start_work_date}</span>
                                                </div>
                                                <div className="flex justify-between border-b pb-2">
                                                    <span className="text-slate-500">ทัศนคติ</span>
                                                    <span className="font-medium text-right max-w-[200px]">{applicant.attitude}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}