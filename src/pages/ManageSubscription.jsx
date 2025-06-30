import React, { useState } from 'react';
import Card from '../components/common/card';
import Button from '../components/common/button';
import Badge from '../components/common/badge';
import Input from '../components/common/input';
import Select from '../components/common/select';
import Dropdown from '../components/common/dropdown';

const subscriptionStatusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
];

const locationSubscriptions = [
    {
        name: 'Restaurant A',
        location: '123 Main St, NY',
        status: 'Active',
        start: 'Jan 15, 2025',
        nextBilling: 'Mar 15, 2025',
    },
];

const additionalServices = [
    {
        title: 'Menu Input & Quarterly Updates',
        desc: '$99.99/year per restaurant',
        action: 'Purchase in Stripe',
    },
    {
        title: 'Additional Menu Updates',
        desc: '$4.99 per update',
        action: 'Purchase in Stripe',
    },
];

const billingHistory = [
    {
        invoice: 'Feb 15, 2025',
        amount: '$2,388.00',
        plan: 'Multi-Location',
        status: 'Paid',
        action: 'View in Stripe',
    },
];

const StripeLogo = () => (
    <span className="inline-block align-middle mr-2 font-bold text-xs tracking-wide text-white" style={{fontFamily: 'Inter, Arial, sans-serif', minWidth: '38px', textAlign: 'center'}}>stripe</span>
);

export default function ManageSubscription() {
    const [statusFilter, setStatusFilter] = useState(subscriptionStatusOptions[0]);
    const [search, setSearch] = useState('');

    return (
        <div className="max-w-7xl mx-auto p-2 md:p-6 w-full">
            {/* Warning Banner */}
            <div className="flex items-stretch mb-4">
                <div className="w-1.5 rounded-l-md bg-[#C1121F]" />
                <div className="flex-1 bg-[#FDECEC] border border-[#F9CFCF] rounded-r-md px-4 py-3 flex items-center">
                    <svg className="w-4 h-4 text-[#C1121F] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    <span className="text-sm text-[#C1121F]">Your subscription will expire in 25 days</span>
                </div>
            </div>

            {/* Plan Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white border text-left border-gray-200 rounded-lg shadow-card p-4 flex flex-col justify-between min-h-[100px]">
                    <div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Current Plan</div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2'>
                            <div className="font-medium text-lg">Multi-Location</div>
                            <span className="inline-block"><Badge variant="warning" className="!bg-[#FFE066] !text-gray-900 ml-2">Active</Badge></span>
                        </div>
                    </div>
                </div>
                <div className="bg-white text-left border border-gray-200 rounded-lg shadow-card p-4 flex flex-col justify-between min-h-[100px]">
                    <div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Billing Cycle </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2'>
                            <div className="font-medium text-lg">Annual</div>
                            <span className='text-base font-normal'>$2,388/year</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white text-left border border-gray-200 rounded-lg shadow-card p-4 flex flex-col justify-between min-h-[100px]">
                    <div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Next Billing Date</div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2'>

                            <div className="font-medium text-lg">Mar 15, 2025</div>
                            <span className='text-base font-normal'>25 days left</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Management */}
            <Card className="mb-4">
                <div className="font-semibold flex flex-col text-left text-lg mb-2">Plan Management
                    <span className='text-base font-normal'>Current Plan Features</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                    <ul className="text-sm text-left text-gray-700 mb-4 list-disc pl-5 space-y-1">
                        <li>Up to 5 locations included</li>
                        <li>Full menu management</li>
                        <li>Staff training access</li>
                        <li>24/7 support</li>
                    </ul>

                    <div className="">
                        <Button className="bg-[#C1121F] hover:bg-[#C1121F]/80 w-full md:w-80 flex items-center justify-center text-white" variant="primary"><StripeLogo />Manage Plan in Stripe</Button>
                    </div>
                </div>
            </Card>

            {/* Location Subscriptions */}
            <Card className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div className="font-semibold text-lg">Location Subscriptions</div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Input id="search-locations" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search locations..." className="w-full md:w-64" />
                        <Dropdown
                            label="All Status"
                            options={subscriptionStatusOptions}
                            selectedOption={statusFilter.label}
                            onSelect={setStatusFilter}
                            className="w-32 bg-background"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border rounded-md">
                        <thead>
                            <tr className="bg-[#FFA944]">
                                <th className="px-4 py-2 text-left font-semibold">Restaurant Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Location</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Next Billing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationSubscriptions.map((loc, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{loc.name}</td>
                                    <td className="px-4 py-2">{loc.location}</td>
                                    <td className="px-4 py-2"><Badge variant="warning">{loc.status}</Badge></td>
                                    <td className="px-4 py-2">{loc.start}</td>
                                    <td className="px-4 py-2">{loc.nextBilling}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {additionalServices.map((service, i) => (
                    <Card key={i}>
                        <div className="font-semibold text-left text-base mb-1">{service.title}</div>
                        <div className="text-sm text-left text-gray-700 mb-4">{service.desc}</div>
                        <div className="flex justify-start">
                            <Button className="bg-[#C1121F] hover:bg-[#C1121F]/80 w-full md:w-auto flex items-center justify-center text-white" variant="primary"><StripeLogo />{service.action}</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Billing History */}
            <Card>
                <div className="font-semibold text-left text-lg mb-3">Billing History</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border rounded-md">
                        <thead>
                            <tr className="bg-[#FFA944]">
                                <th className="px-4 py-2 text-left font-semibold">Invoice Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                                <th className="px-4 py-2 text-left font-semibold">Plan Type</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingHistory.map((bill, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{bill.invoice}</td>
                                    <td className="px-4 py-2">{bill.amount}</td>
                                    <td className="px-4 py-2">{bill.plan}</td>
                                    <td className="px-4 py-2"><Badge variant="warning">{bill.status}</Badge></td>
                                    <td className="px-4 py-2">
                                        <Button size="sm" className="flex items-center justify-center bg-[#C1121F] hover:bg-[#C1121F]/80 text-white"><StripeLogo />{bill.action}</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
} 