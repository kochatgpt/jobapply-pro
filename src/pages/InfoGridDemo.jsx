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

// Template 8: Dot Separator (Minimal)
const DotSeparator = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4 space-y-3">
            {Object.entries(data).map(([key, value], idx) => (
                <div key={key} className="flex justify-between items-baseline gap-4">
                    <span className="text-sm font-medium text-slate-600">{key.replace(/_/g, ' ')}</span>
                    <span className="flex-1 border-b border-dotted border-slate-300"></span>
                    <span className="text-sm font-bold text-slate-800 text-right">{value || '-'}</span>
                </div>
            ))}
        </CardContent>
    </Card>
);

// Template 9: Colored Header Cards
const ColoredHeaders = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="rounded-lg overflow-hidden border border-slate-200">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-3 py-2">
                            <p className="text-xs font-semibold text-white uppercase">{key.replace(/_/g, ' ')}</p>
                        </div>
                        <div className="px-3 py-3 bg-white">
                            <p className="text-sm font-bold text-slate-800">{value || '-'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 10: Hover Highlight
const HoverHighlight = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-3">
            <div className="space-y-2">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors cursor-default border border-slate-100 hover:border-indigo-300">
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-sm font-medium text-slate-600">{key.replace(/_/g, ' ')}</span>
                            <span className="text-sm font-bold text-slate-800">{value || '-'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 11: Icon Labels
const IconLabels = ({ data, title, icon: Icon }) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                            <p className="text-sm font-bold text-slate-800">{value || '-'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 12: Gradient Background
const GradientBackground = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
        {(title || Icon) && (
            <CardHeader className="pb-3 bg-gradient-to-r from-indigo-500 to-purple-600">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                    {Icon && <Icon className="w-4 h-4" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4 bg-gradient-to-br from-slate-50 to-white">
            <div className="space-y-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg px-4 py-3 shadow-sm border border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-bold text-slate-800">{value || '-'}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 13: Compact Inline
const CompactInline = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="inline-flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase">{key.replace(/_/g, ' ')}:</span>
                        <span className="text-sm font-bold text-slate-800">{value || '-'}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 14: A4 Document Style (PDF-like)
const A4Document = ({ data, title, icon: Icon }) => (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-2xl" style={{ aspectRatio: '210/297' }}>
        {/* A4 Paper */}
        <div className="w-full h-full p-8 sm:p-12 overflow-auto">
            {/* Document Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        {Icon && <Icon className="w-8 h-8 text-indigo-600 mb-2" />}
                        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    </div>
                    <div className="text-right text-sm text-slate-600">
                        <p>วันที่: {new Date().toLocaleDateString('th-TH')}</p>
                        <p>เลขที่เอกสาร: #001234</p>
                    </div>
                </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6">
                {Object.entries(data).map(([key, value], idx) => (
                    <div key={key} className="grid grid-cols-3 gap-4 border-b border-slate-200 pb-3">
                        <div className="col-span-1 font-semibold text-slate-700">
                            {idx + 1}. {key.replace(/_/g, ' ')}
                        </div>
                        <div className="col-span-2 text-slate-900 font-medium">
                            {value || '-'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Document Footer */}
            <div className="mt-12 pt-6 border-t border-slate-300">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="border-b border-slate-400 mb-2 pb-8"></div>
                        <p className="text-sm text-slate-600">ผู้จัดทำ</p>
                    </div>
                    <div className="text-center">
                        <div className="border-b border-slate-400 mb-2 pb-8"></div>
                        <p className="text-sm text-slate-600">ผู้อนุมัติ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

                    {/* Template 5 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">5</div>
                            <h2 className="text-xl font-bold text-slate-800">Accent Left Border</h2>
                        </div>
                        <AccentBorder data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 6 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">6</div>
                            <h2 className="text-xl font-bold text-slate-800">Badge Style</h2>
                        </div>
                        <BadgeStyle data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 7 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm">7</div>
                            <h2 className="text-xl font-bold text-slate-800">Split Panel</h2>
                        </div>
                        <SplitPanel data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 8 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm">8</div>
                            <h2 className="text-xl font-bold text-slate-800">Dot Separator (Minimal)</h2>
                        </div>
                        <DotSeparator data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 9 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">9</div>
                            <h2 className="text-xl font-bold text-slate-800">Colored Header Cards</h2>
                        </div>
                        <ColoredHeaders data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 10 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">10</div>
                            <h2 className="text-xl font-bold text-slate-800">Hover Highlight</h2>
                        </div>
                        <HoverHighlight data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 11 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">11</div>
                            <h2 className="text-xl font-bold text-slate-800">Icon Labels</h2>
                        </div>
                        <IconLabels data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 12 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center font-bold text-sm">12</div>
                            <h2 className="text-xl font-bold text-slate-800">Gradient Background</h2>
                        </div>
                        <GradientBackground data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 13 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center font-bold text-sm">13</div>
                            <h2 className="text-xl font-bold text-slate-800">Compact Inline</h2>
                        </div>
                        <CompactInline data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>

                    {/* Template 14 */}
                    <div className="col-span-full">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">14</div>
                            <h2 className="text-xl font-bold text-slate-800">A4 Document Style (PDF-like)</h2>
                        </div>
                        <A4Document data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
                    </div>
                </div>
            </div>
        </div>
    );
}