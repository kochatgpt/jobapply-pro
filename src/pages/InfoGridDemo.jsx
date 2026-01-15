import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Phone, Mail, Calendar } from "lucide-react";

// Template 1: Clean Two-Column Table
const TwoColumnLayout = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-0">
            <table className="w-full text-sm">
                <tbody>
                    {Object.entries(data).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="px-4 py-3 font-medium text-slate-600 w-40 border-r border-slate-100">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                                {value || <span className="text-slate-300">-</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardContent>
    </Card>
);

// Template 2: Stacked Responsive Cards
const StackedCards = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="border border-slate-200 rounded-lg px-3 py-2 bg-white hover:border-indigo-300 transition">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-semibold text-slate-800">{value || '-'}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 3: Vertical Stack (Minimal)
const VerticalStack = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-6 space-y-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{key.replace(/_/g, ' ')}</p>
                    <p className="text-base font-semibold text-slate-800">{value || '-'}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

// Template 4: Definition List (DL style)
const DefinitionList = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <dl className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                        <dt className="font-semibold text-slate-600">{key.replace(/_/g, ' ')}</dt>
                        <dd className="text-slate-700 text-right">{value || '-'}</dd>
                    </div>
                ))}
            </dl>
        </CardContent>
    </Card>
);

// Template 5: Accent Left Border
const AccentBorder = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4 space-y-2">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <p className="text-xs text-slate-500 font-semibold uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                    <p className="text-sm font-semibold text-slate-800">{value || '-'}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

// Template 6: Badge Style
const BadgeStyle = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="inline-block bg-indigo-50 border border-indigo-200 rounded-full px-4 py-2">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-0.5">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-bold text-indigo-600">{value || '-'}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 7: Split Panel
const SplitPanel = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {Object.entries(data).map(([key, value], idx) => (
                    <div key={key} className={`px-6 py-4 ${idx % 2 === 0 ? 'bg-slate-50 border-r border-b border-slate-100' : 'border-b border-slate-100'} ${idx === Object.entries(data).length - 1 ? 'border-b-0' : ''}`}>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">{key.replace(/_/g, ' ')}</p>
                        <p className="text-base font-bold text-slate-800">{value || '-'}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default function InfoGridDemo() {
    const sampleData = {
        first_name: 'นาย',
        last_name: 'ตัวอย่าง',
        email: 'test@mail.com',
        phone: '089-xxx-xxxx',
        dob: '1990-01-15',
        gender: 'ชาย',
        nationality: 'ไทย'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">InfoGrid Templates</h1>
                    <p className="text-slate-600">เลือก Template ที่ชอบให้ผมแก้เป็นหลัก</p>
                </div>

                <div className="space-y-8">
                    {/* Template 1 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
                            <h2 className="text-xl font-bold text-slate-800">Clean Two-Column Table</h2>
                        </div>
                        <TwoColumnLayout data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 2 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                            <h2 className="text-xl font-bold text-slate-800">Stacked Responsive Cards</h2>
                        </div>
                        <StackedCards data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 3 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
                            <h2 className="text-xl font-bold text-slate-800">Vertical Stack (Minimal)</h2>
                        </div>
                        <VerticalStack data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 4 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">4</div>
                            <h2 className="text-xl font-bold text-slate-800">Definition List Style</h2>
                        </div>
                        <DefinitionList data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>
                </div>
            </div>
        </div>
    );
}