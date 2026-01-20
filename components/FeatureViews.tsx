
import React, { useState } from 'react';
import { Card, Button, Input, Badge } from './ui-mock';

export const ToolsView: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    const inc = parseFloat(income);
    if (isNaN(inc)) return;
    // Simple mock calculation logic
    if (inc <= 500000) setTax(0);
    else if (inc <= 1000000) setTax((inc - 500000) * 0.1);
    else setTax(50000 + (inc - 1000000) * 0.2);
  };

  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Tools</h1>
        <p className="text-slate-500">Essential calculators and utilities for Chartered Accountants.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 border-indigo-100 bg-indigo-50/30">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Income Tax Calculator (FY 24-25)</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-1">Annual Taxable Income (₹)</label>
              <Input 
                type="number" 
                placeholder="e.g. 1200000" 
                value={income} 
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <Button onClick={calculateTax} className="w-full">Calculate Tax Liability</Button>
            
            {tax !== null && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200 animate-in zoom-in-95 duration-300">
                <p className="text-sm text-slate-500 mb-1">Estimated Tax Payable</p>
                <p className="text-3xl font-black text-indigo-600">₹ {tax.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 mt-2">*This is a simplified mock calculation for demonstration purposes.</p>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4 hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900">GST Portal</h4>
            <p className="text-xs text-slate-500">Direct access to GST return filing and verification tools.</p>
          </Card>
          <Card className="p-4 hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900">Audit Checklists</h4>
            <p className="text-xs text-slate-500">Comprehensive checklists for statutory and internal audits.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const PracticeView: React.FC = () => {
  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Practice Arena</h1>
          <p className="text-slate-500">Sharpen your knowledge with real-world scenarios and mock tests.</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-indigo-100 text-indigo-700">Level: Intermediate</Badge>
          <Badge className="bg-emerald-100 text-emerald-700">Rank: #420</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Financial Reporting (FR)", questions: 50, time: "90 min", color: "indigo" },
          { title: "Strategic Financial Mgmt", questions: 40, time: "60 min", color: "blue" },
          { title: "Advanced Auditing", questions: 60, time: "120 min", color: "emerald" },
          { title: "Direct Tax Laws", questions: 45, time: "90 min", color: "orange" },
          { title: "Indirect Tax Laws", questions: 45, time: "90 min", color: "purple" },
          { title: "Corporate & Economic Laws", questions: 30, time: "45 min", color: "pink" }
        ].map((test, i) => (
          <Card key={i} className="p-6 hover:shadow-lg transition-all border-slate-100">
            <h3 className="font-bold text-lg mb-4">{test.title}</h3>
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {test.questions} MCQs
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {test.time}
              </span>
            </div>
            <Button variant="outline" className="w-full">Start Practice</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const JobsView: React.FC = () => {
  const jobs = [
    { title: "Senior Auditor", company: "Big Four Accounting", location: "Mumbai", salary: "₹18-24 LPA", tags: ["HYBRID", "FULL-TIME"] },
    { title: "Financial Controller", company: "Tech Unicorn", location: "Bangalore", salary: "₹25-35 LPA", tags: ["REMOTE", "URGENT"] },
    { title: "Tax Consultant", company: "Global Advisory", location: "Gurugram", salary: "₹15-20 LPA", tags: ["OFFICE", "PERMANENT"] },
    { title: "Finance Manager", company: "Retail Group", location: "Pune", salary: "₹12-18 LPA", tags: ["OFFICE", "FULL-TIME"] },
  ];

  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Board</h1>
        <p className="text-slate-500">Exclusive opportunities for CAs at top-tier organizations.</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, i) => (
          <Card key={i} className="p-6 hover:border-indigo-200 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{job.company} • {job.location}</p>
                  <div className="flex gap-2">
                    {job.tags.map(tag => (
                      <Badge key={tag} className="text-[9px] bg-slate-100 text-slate-600 border-none">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                <span className="text-indigo-600 font-bold">{job.salary}</span>
                <Button variant="primary" className="px-8 shadow-md shadow-indigo-100">Apply Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ProfileView: React.FC = () => {
  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-8 text-center bg-white shadow-xl shadow-slate-200/50">
            <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
              JD
            </div>
            <h2 className="text-xl font-bold text-slate-900">John Doe, CA</h2>
            <p className="text-sm text-slate-500 mb-6">Chartered Accountant • Batch of 2023</p>
            <Button variant="outline" className="w-full text-xs">Edit Profile</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Activity Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Blogs Read</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Practice Tests</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Job Applications</span>
                <span className="font-bold">3</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Learning Journey</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Direct Tax Masterclass</span>
                  <span className="text-indigo-600">75%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Audit Documentation Course</span>
                  <span className="text-indigo-600">30%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Recent Bookmarks</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-sm font-medium border border-transparent hover:border-slate-200">
                Understanding the New Section 194R
              </div>
              <div className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-sm font-medium border border-transparent hover:border-slate-200">
                GST Audit Checklist for FY 2024
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
