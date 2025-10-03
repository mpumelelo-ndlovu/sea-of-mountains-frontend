// FILE: src/pages/DashboardPage.jsx
// REVISED: Optimized for mobile by converting tables to a card-based layout on small screens and adjusting padding/typography.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toastSuccess, toastError } from '../utils/toastService';
import applicationBanner from '../assets/hero-background.webp';
import {
    ClockIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, DocumentTextIcon,
    BuildingOfficeIcon, BanknotesIcon, HomeModernIcon, MegaphoneIcon, ExclamationTriangleIcon,
    WrenchScrewdriverIcon, PlusCircleIcon, PhotoIcon, XMarkIcon, StarIcon, ShieldCheckIcon,
    ArrowPathIcon, UserMinusIcon, ArrowDownTrayIcon, EnvelopeIcon, PhoneIcon, EyeIcon, ArrowUpTrayIcon, AcademicCapIcon, InformationCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// --- Reusable Success Modal ---
const SuccessModal = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 text-center max-w-sm transform transition-all animate-fade-in-up">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <CheckCircleIcon className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 mt-2 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-ocean-blue text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


// --- ANNOUNCEMENT MODAL COMPONENT ---
const AnnouncementModal = ({ announcements, onClose }) => {
    if (!announcements || announcements.length === 0) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-up">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center">
                        <MegaphoneIcon className="h-7 w-7 sm:h-8 sm:w-8 mr-3 text-ocean-blue" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Important Announcements</h2>
                    </div>
                </div>
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                    {announcements.map((ann) => (
                        <div key={ann.id} className="border-l-4 border-mountain-tan pl-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{ann.title}</h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Posted on: {new Date(ann.date_posted).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 whitespace-pre-wrap">{ann.content}</p>
                        </div>
                    ))}
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg text-right">
                    <button
                        onClick={onClose}
                        className="bg-ocean-blue text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Reusable UI Components ---
const StatusDisplay = ({ status }) => {
    const statusStyles = {
        PENDING: { icon: ClockIcon, text: 'Pending Review', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        PROVISIONALLY_APPROVED: { icon: CheckCircleIcon, text: 'Provisionally Approved', color: 'text-green-600', bgColor: 'bg-green-100' },
        APPROVED: { icon: ShieldCheckIcon, text: 'Approved - Application Finalized', color: 'text-blue-600', bgColor: 'bg-blue-100' },
        DECLINED: { icon: XCircleIcon, text: 'Declined', color: 'text-red-600', bgColor: 'bg-red-100' },
        WAITLISTED: { icon: QuestionMarkCircleIcon, text: 'Waitlisted', color: 'text-blue-600', bgColor: 'bg-blue-100' },
        UNDER_REVIEW: { icon: ClockIcon, text: 'Under Review', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
        REQUIRES_DOCUMENTS: { icon: DocumentTextIcon, text: 'Requires Documents', color: 'text-orange-600', bgColor: 'bg-orange-100' },
        TENANT_CREATED: { icon: ShieldCheckIcon, text: 'Finalized (Tenant Created)', color: 'text-gray-600', bgColor: 'bg-gray-100' },
    };
    const currentStatus = statusStyles[status] || statusStyles.PENDING;
    const Icon = currentStatus.icon;
    return <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-base sm:text-lg font-semibold ${currentStatus.bgColor} ${currentStatus.color}`}><Icon className="h-5 w-5 sm:h-6 sm:w-6 mr-2" /><span>{currentStatus.text}</span></div>;
};

const PaymentStatusBadge = ({ status }) => {
    const statusStyles = {
        PENDING: { text: 'Pending', color: 'text-yellow-800', bgColor: 'bg-yellow-200' },
        CONFIRMED: { text: 'Confirmed', color: 'text-green-800', bgColor: 'bg-green-200' },
        FAILED: { text: 'Failed', color: 'text-red-800', bgColor: 'bg-red-200' },
        REFUNDED: { text: 'Refunded', color: 'text-gray-800', bgColor: 'bg-gray-200' },
    };
    const currentStatus = statusStyles[status] || { text: status, color: 'text-gray-800', bgColor: 'bg-gray-200' };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.bgColor} ${currentStatus.color}`}>{currentStatus.text}</span>;
};

const InfoCard = ({ title, value, icon: Icon }) => (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex items-center text-gray-500 mb-2"><Icon className="h-5 w-5 mr-2" /><h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3></div>
        <p className="text-xl sm:text-2xl font-bold text-ocean-blue">{value || 'N/A'}</p>
    </div>
);

const LeaseUploadSection = ({ tenant, refreshData, showSuccessPopup }) => {
    const { api } = useAuth();
    const [leaseFile, setLeaseFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setLeaseFile(e.target.files[0] || null);
        setError('');
    };

    const handleUpload = async () => {
        if (!leaseFile) {
            setError('Please select a file to upload.');
            return;
        }
        setIsUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('signed_lease', leaseFile);
        try {
            const response = await api.patch('/api/tenant/upload-lease/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                showSuccessPopup("Lease Uploaded", "Your signed lease agreement has been submitted.");
                await refreshData();
            }
        } catch (err) {
            console.error("Lease upload failed:", err);
            setError(err.response?.data?.detail || 'An error occurred during upload. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleViewLease = () => {
        if (!tenant || !tenant.signed_lease) {
            toastError("No lease file found to view.");
            return;
        }
        try {
            const fileURL = new URL(tenant.signed_lease, import.meta.env.VITE_API_BASE_URL).href;
            window.open(fileURL, '_blank', 'noopener,noreferrer');
        } catch (error) {
            window.open(tenant.signed_lease, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6 border-b pb-4">Lease Agreement</h2>
            {tenant.signed_lease ? (
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                    <div className="flex items-start">
                        <ShieldCheckIcon className="h-8 w-8 text-green-500 mr-4 flex-shrink-0" />
                        <div>
                            <h4 className="text-lg font-semibold text-green-800">Lease Agreement Uploaded</h4>
                            <p className="text-green-700 mt-1">
                                Your document was successfully uploaded on {new Date(tenant.lease_upload_date).toLocaleString()}.
                            </p>
                            <button
                                onClick={handleViewLease}
                                className="inline-flex items-center mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                            >
                                <EyeIcon className="h-5 w-5 mr-2" />
                                View My Lease
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-gray-700 mb-4">Please upload your signed lease agreement. The document must be a PDF file.</p>
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-ocean-blue hover:file:bg-blue-100 cursor-pointer"
                        />
                        <button
                            onClick={handleUpload}
                            disabled={isUploading || !leaseFile}
                            className="inline-flex items-center justify-center w-full sm:w-auto bg-ocean-blue hover:bg-opacity-80 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
};

const StatusInfoBox = ({ children, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-50 border-blue-200 text-blue-800',
        orange: 'bg-orange-50 border-orange-200 text-orange-800',
        red: 'bg-red-50 border-red-200 text-red-800',
        green: 'bg-green-50 border-green-200 text-green-800',
        indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    };
    return (
        <div className={`mt-6 p-4 rounded-lg border text-left ${colors[color]}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon className={`h-5 w-5 ${colors[color].split(' ')[2]}`} aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm">{children}</p>
                </div>
            </div>
        </div>
    );
};

const ProofOfAdminFeeSection = ({ refreshData, showSuccessPopup }) => {
    const { api } = useAuth();
    const [podFile, setPodFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setPodFile(e.target.files[0] || null);
        setError('');
    };

    const handleUpload = async () => {
        if (!podFile) {
            setError('Please select a file to upload.');
            return;
        }
        setIsUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('proof_of_deposit', podFile);
        try {
            const response = await api.patch('/api/application/upload-pod/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                showSuccessPopup("Upload Successful", "Your Proof of Admin Fee has been submitted.");
                await refreshData();
            }
        } catch (err) {
            console.error("Proof of Admin Fee upload failed:", err);
            const errorData = err.response?.data;
            let errorMessage = 'An error occurred during upload. Please try again.';
            if (errorData) {
                const firstErrorKey = Object.keys(errorData)[0];
                errorMessage = errorData[firstErrorKey][0] || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setIsUploading(false);
        }
    };
    
    return (
        <div className="mt-8 text-left">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-6 rounded-r-lg">
                <h4 className="font-bold text-lg sm:text-xl text-yellow-800 mb-2">Upload Proof of Admin Fee</h4>
                <p className="text-yellow-700 text-sm mb-4">
                    To finalize your application, the non-refundable <strong>R550</strong> admin fee is now required. Please upload your proof of payment to secure your spot.
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm text-sm text-gray-700">
                    <p className="font-semibold">Banking Details:</p>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                        <li><strong>Account Name:</strong> Sea of Mountains Student Accommodation</li>
                        <li><strong>Bank Name:</strong> ABSA Bank</li>
                        <li><strong>Account Number:</strong> 4092944791</li>
                        <li><strong>Branch Code:</strong> 632005</li>
                        <li><strong>Reference:</strong> Your Student Number</li>
                    </ul>
                </div>
                 <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 mt-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-800 hover:file:bg-yellow-200 cursor-pointer"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={isUploading || !podFile}
                        className="inline-flex items-center justify-center w-full sm:w-auto bg-ocean-blue hover:bg-opacity-80 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

const ApplicantView = ({ application, onCancel, refreshData, showSuccessPopup }) => {
    const { api } = useAuth();
    const [uploads, setUploads] = useState({});
    const [uploading, setUploading] = useState(null); 

    const handleFileChange = (docName, file) => {
        setUploads(prev => ({ ...prev, [docName]: file }));
    };

    const handleUpload = async (docName) => {
        const file = uploads[docName];
        if (!file) {
            toastError("Please select a file to upload.");
            return;
        }
        setUploading(docName);
        const formData = new FormData();
        formData.append('document', file);
        formData.append('document_name', docName);
        try {
            const response = await api.post('/api/application/upload-document/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                showSuccessPopup("Document Uploaded", "Your document has been submitted successfully.");
                await refreshData();
            }
        } catch (error) {
            toastError(`Error uploading ${docName}. Please try again.`);
            console.error("Upload error:", error);
        } finally {
            setUploading(null);
        }
    };
    
    const shouldShowPodUpload = application.status === 'PROVISIONALLY_APPROVED' && !application.proof_of_deposit;

    const assignedRoomType = application.final_assigned_room?.room_type ? application.final_assigned_room.room_type.split('(')[0].trim() : 'N/A';

    return (
        <div className="text-center space-y-6">
            <p className="text-lg text-gray-700">Thank you for your application submitted on {new Date(application.application_date).toLocaleDateString()}.</p>
            
            {application.reference_number && (
                <div className="bg-gray-100 p-3 rounded-md inline-block">
                    <span className="text-sm text-gray-600">Your Application Reference:</span>
                    <p className="font-bold text-xl text-ocean-blue tracking-wider">{application.reference_number}</p>
                </div>
            )}

            <div><h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Current Status:</h3><StatusDisplay status={application.status} /></div>
            
            {application.status === 'PENDING' && <StatusInfoBox color="blue">Our team is currently reviewing your application. We will notify you via email as soon as there is an update. This process typically takes 5-7 business days.</StatusInfoBox>}
            {application.status === 'UNDER_REVIEW' && <StatusInfoBox color="indigo">Your application has passed the initial checks and is now under detailed review by our team. You are one step closer! We will notify you of the final decision soon.</StatusInfoBox>}
            {application.status === 'WAITLISTED' && <StatusInfoBox color="blue">You have been placed on our waitlist. This means that while we don't have a spot for you right now, you are a priority candidate if one becomes available. Please login regularly to check for updates to your status and we might also contact you immediately if a room opens up.</StatusInfoBox>}
            {application.status === 'DECLINED' && <StatusInfoBox color="red">After careful consideration, we are unable to offer you accommodation at this time. We wish you the best in your search.</StatusInfoBox>}
            
            {application.status === 'PROVISIONALLY_APPROVED' && (
                <div>
                    <div className="grid md:grid-cols-2 gap-6 my-6 text-left">
                        <InfoCard title="Assigned Room Type" value={assignedRoomType} icon={BuildingOfficeIcon} />
                        <InfoCard title="Assigned Room Number" value={application.final_assigned_room?.room_number} icon={HomeModernIcon} />
                    </div>
                    <StatusInfoBox color="green">
                        Congratulations! Your application has been provisionally approved. Your {assignedRoomType || 'room'} for {application.cycle?.year || 'the upcoming year'} is reserved. To finalize your placement, please pay the admin fee and upload the proof of payment below.
                    </StatusInfoBox>
                </div>
            )}

            {application.status === 'APPROVED' && (
                <div>
                    <div className="grid md:grid-cols-2 gap-6 my-6 text-left">
                        <InfoCard title="Assigned Room Type" value={assignedRoomType} icon={BuildingOfficeIcon} />
                        <InfoCard title="Assigned Room Number" value={application.final_assigned_room?.room_number} icon={HomeModernIcon} />
                    </div>
                    <StatusInfoBox color="green">
                        Congratulations, your application to Sea of Mountains Student Accommodation is finalized and successful! Your {assignedRoomType || 'room'} for {application.cycle?.year || 'the upcoming year'} has been reserved for you. We look forward to welcoming you into the SOMA Community. Please log in regularly to check for notifications and check your emails for important updates. For any questions, please email fatima@somaccommodation.com
                    </StatusInfoBox>
                </div>
            )}

            {application.status === 'REQUIRES_DOCUMENTS' && (
                <div className="bg-orange-50 p-6 rounded-lg text-orange-800 border border-orange-200 text-left">
                    <h4 className="font-bold text-xl mb-2">Action Required</h4>
                    <p className="mb-4 text-sm">{application.processing_notes || "Our team has reviewed your application and requires some additional documents to proceed. Please upload the files requested below."}</p>
                    <div className="space-y-4">
                        {Array.isArray(application.required_documents) && application.required_documents.map((doc, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-3 bg-white rounded-md shadow-sm">
                                <span className="font-semibold text-gray-700 mb-2 sm:mb-0">{doc.name}</span>
                                {doc.uploaded ? (
                                    <span className="flex items-center text-green-600 font-semibold"><ShieldCheckIcon className="h-5 w-5 mr-1" /> Uploaded</span>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <input type="file" id={`upload-${index}`} className="hidden" onChange={(e) => handleFileChange(doc.name, e.target.files[0])} />
                                        <label htmlFor={`upload-${index}`} className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300 whitespace-nowrap">
                                            {uploads[doc.name]?.name || 'Choose File'}
                                        </label>
                                        <button 
                                            onClick={() => handleUpload(doc.name)} 
                                            disabled={!uploads[doc.name] || uploading === doc.name}
                                            className="bg-ocean-blue text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-80 disabled:bg-gray-400"
                                        >
                                            {uploading === doc.name ? 'Uploading...' : 'Upload'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {shouldShowPodUpload && <ProofOfAdminFeeSection refreshData={refreshData} showSuccessPopup={showSuccessPopup} />}
            
            {application.proof_of_deposit && !['TENANT_CREATED', 'CANCELLED', 'DECLINED', 'APPROVED'].includes(application.status) && (
                <StatusInfoBox color="green">
                    Thank you. We have received your Proof of Admin Fee. Your application is now being finalized.
                </StatusInfoBox>
            )}

            {application.reference_number && !['TENANT_CREATED', 'DECLINED', 'CANCELLED'].includes(application.status) && (
                 <StatusInfoBox color="blue">
                    If you have any queries regarding your application, please email us and quote your reference number: <strong>{application.reference_number}</strong>
                </StatusInfoBox>
            )}

            {application.status === 'PENDING' && (<button onClick={onCancel} className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300">Cancel My Application</button>)}
        </div>
    );
};

const ActiveTenantView = ({ tenant, requests, refreshData, onDownload, isDownloading, showSuccessPopup }) => {
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [feedbackRequest, setFeedbackRequest] = useState(null);
    const balance = parseFloat(tenant.balance);
    let balanceLabel = 'Outstanding Balance:';
    let balanceAmount = balance;
    let balanceContainerClass = 'bg-yellow-50 border-l-4 border-yellow-400';
    let balanceTextClass = 'text-yellow-700';
    let balanceIconColor = 'text-yellow-400';
    if (balance < 0) {
        balanceLabel = 'Balance Due To You:';
        balanceAmount = Math.abs(balance);
        balanceContainerClass = 'bg-green-50 border-l-4 border-green-400';
        balanceTextClass = 'text-green-700';
        balanceIconColor = 'text-green-400';
    } else if (balance === 0) {
        balanceContainerClass = 'bg-blue-50 border-l-4 border-blue-400';
        balanceTextClass = 'text-blue-700';
        balanceIconColor = 'text-blue-400';
    }
    return (
        <div className="space-y-12">
            {requestModalOpen && <NewRequestModal closeModal={() => setRequestModalOpen(false)} refreshData={refreshData} />}
            {feedbackRequest && <FeedbackModal request={feedbackRequest} closeModal={() => setFeedbackRequest(null)} refreshData={refreshData} />}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6 border-b pb-4">My Tenancy Details</h2>
                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                    <InfoCard title="Room Type" value={tenant.assigned_room_type} icon={BuildingOfficeIcon} />
                    <InfoCard title="Room Number" value={tenant.assigned_room} icon={HomeModernIcon} />
                    <InfoCard title="Move-in Date" value={new Date(tenant.move_in_date).toLocaleDateString()} icon={CheckCircleIcon} />
                </div>
            </div>
            <LeaseUploadSection tenant={tenant} refreshData={refreshData} showSuccessPopup={showSuccessPopup} />
            
            {/* Payments Section - Now Responsive */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6 border-b pb-4">My Payments</h2>
                {tenant.payments && tenant.payments.length > 0 ? (
                    <>
                        {/* Mobile Card View */}
                        <div className="space-y-4 md:hidden">
                            {tenant.payments.map((payment, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-800">{payment.description}</p>
                                            <p className="text-sm text-gray-500">{new Date(payment.payment_date).toLocaleDateString()}</p>
                                        </div>
                                        <p className="font-bold text-lg text-ocean-blue">R {payment.amount}</p>
                                    </div>
                                    <div className="mt-2">
                                        <PaymentStatusBadge status={payment.status} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">{tenant.payments.map((payment, index) => (<tr key={index}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(payment.payment_date).toLocaleDateString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm"><PaymentStatusBadge status={payment.status} /></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">R {payment.amount}</td></tr>))}</tbody>
                            </table>
                        </div>
                    </>
                ) : <p className="text-gray-600">No payment history found.</p>}
                
                <div className={`mt-6 p-4 ${balanceContainerClass}`}>
                    <div className="flex">
                        <div className="flex-shrink-0"><BanknotesIcon className={`h-5 w-5 ${balanceIconColor}`} aria-hidden="true" /></div>
                        <div className="ml-3"><p className={`text-sm ${balanceTextClass}`}>{balanceLabel} <span className="font-bold">R {balanceAmount.toFixed(2)}</span></p></div>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={onDownload} disabled={isDownloading} className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400">
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        {isDownloading ? 'Downloading...' : 'Download Statement'}
                    </button>
                </div>
            </div>

            {/* Fines & Warnings Section - Now Responsive */}
            {tenant.violations && tenant.violations.length > 0 && (
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6 border-b pb-4">Fines & Warnings</h2>
                    {/* Mobile Card View */}
                    <div className="space-y-4 md:hidden">
                        {tenant.violations.map((v, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">{v.type}</p>
                                        <p className="text-sm text-gray-500">{new Date(v.date_issued).toLocaleDateString()}</p>
                                    </div>
                                    <p className="font-bold text-lg text-red-600">{v.amount ? `R ${v.amount}` : 'N/A'}</p>
                                </div>
                                <p className="mt-2 text-sm text-gray-700">{v.reason}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th></tr></thead>
                            <tbody className="divide-y divide-gray-200">{tenant.violations.map((v, index) => (<tr key={index}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(v.date_issued).toLocaleDateString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{v.type}</td><td className="px-6 py-4 text-sm text-gray-500">{v.reason}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">{v.amount ? `R ${v.amount}` : 'N/A'}</td></tr>))}</tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {/* Maintenance Requests Section - Now Responsive */}
             <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue">My Maintenance Requests</h2>
                    <button onClick={() => setRequestModalOpen(true)} className="flex items-center bg-ocean-blue hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 w-full sm:w-auto justify-center"><PlusCircleIcon className="h-5 w-5 mr-2" />Submit New Request</button>
                </div>
                 {requests && requests.length > 0 ? (
                    <>
                        {/* Mobile Card View */}
                        <div className="space-y-4 md:hidden">
                            {requests.map((req) => (
                                <div key={req.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                    <p className="font-semibold text-gray-800">{req.title}</p>
                                    <p className="text-sm text-gray-500">Submitted: {new Date(req.date_submitted).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Status: <span className="font-semibold">{req.status}</span></p>
                                    <p className="text-sm text-gray-500">Completed: {req.date_completed ? new Date(req.date_completed).toLocaleDateString() : 'N/A'}</p>
                                    {req.status === 'COMPLETED' && req.tenant_rating === null && (
                                        <div className="mt-3 text-center">
                                            <button onClick={() => setFeedbackRequest(req)} className="text-ocean-blue hover:text-blue-700 font-semibold text-sm">Leave Feedback</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th><th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
                                <tbody className="divide-y divide-gray-200">{requests.map((req) => (<tr key={req.id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(req.date_submitted).toLocaleDateString()}</td><td className="px-6 py-4 text-sm text-gray-900">{req.title}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{req.status}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date_completed ? new Date(req.date_completed).toLocaleDateString() : 'N/A'}</td><td className="px-6 py-4 whitespace-nowrap text-center text-sm">{req.status === 'COMPLETED' && req.tenant_rating === null && (<button onClick={() => setFeedbackRequest(req)} className="text-ocean-blue hover:text-blue-700 font-semibold">Leave Feedback</button>)}</td></tr>))}</tbody>
                            </table>
                        </div>
                    </>
                ) : <p className="text-gray-600">No maintenance requests found.</p>}
            </div>
        </div>
    );
};

const InactiveTenantView = ({ tenant, onDownload, isDownloading }) => {
    return (
    <div className="space-y-6">
        <div className="text-center bg-gray-100 p-6 sm:p-8 rounded-lg">
            <UserMinusIcon className="h-16 w-16 text-gray-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mt-4">Tenancy Concluded</h2>
            <p className="text-lg text-gray-700 mt-2">
                Our records show that your tenancy concluded on{' '}
                <span className="font-semibold">
                    {tenant.move_out_date ? new Date(tenant.move_out_date).toLocaleDateString() : 'the specified date'}
                </span>.
            </p>
            <p className="text-gray-600 mt-2">
                Your final financial records are available below. If you believe this is an error, please contact administration.
            </p>
        </div>
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ocean-blue mb-6 border-b pb-4">Final Payment History</h2>
            {tenant.payments && tenant.payments.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">{tenant.payments.map((payment, index) => (<tr key={index}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(payment.payment_date).toLocaleDateString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm"><PaymentStatusBadge status={payment.status} /></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">R {payment.amount}</td></tr>))}</tbody>
                    </table>
                </div>
            ) : <p className="text-gray-600">No payment history found.</p>}
            <div className="mt-6 text-right">
                <button onClick={onDownload} disabled={isDownloading} className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400">
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    {isDownloading ? 'Downloading...' : 'Download Final Statement'}
                </button>
            </div>
        </div>
    </div>
    );
};

const NoApplicationView = () => {
    return (
    <div className="text-center py-10 space-y-6">
        <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto" /><h3 className="text-2xl font-bold text-gray-800">No Application Found</h3><p className="text-gray-600">It looks like you haven't submitted an application yet.</p>
        <Link to="/apply" className="inline-block bg-mountain-tan hover:bg-opacity-80 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">Start Your Application</Link>
    </div>
    );
};

const NewRequestModal = ({ closeModal, refreshData }) => {
    const { api } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requestError, setRequestError] = useState('');
    const [formData, setFormData] = useState({ title: '', description: '', category: 'OTHER', priority: 'MEDIUM', photo: null });
    const handleChange = (e) => { const { name, value, files } = e.target; if (name === 'photo') { setFormData(prev => ({...prev, photo: files[0] })); } else { setFormData(prev => ({ ...prev, [name]: value })); } };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setRequestError('');
        const submission = new FormData();
        Object.keys(formData).forEach(key => { if (formData[key]) { submission.append(key, formData[key]); } });
        try {
            const response = await api.post('/api/maintenance-requests/', submission, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.status === 201) {
                toastSuccess('Maintenance request submitted successfully!');
                refreshData();
                closeModal();
            } else {
                throw new Error('Failed to submit request.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            const errorMessage = error.response?.data?.detail || 'Submission failed. Please try again.';
            toastError(errorMessage);
            setRequestError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    const categoryChoices = [ 'PLUMBING', 'ELECTRICAL', 'HVAC', 'FURNITURE', 'APPLIANCES', 'CLEANING', 'SECURITY', 'OTHER' ];
    const priorityChoices = [ 'LOW', 'MEDIUM', 'HIGH', 'URGENT' ];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"><div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg relative"><button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="h-6 w-6" /></button><h2 className="text-2xl font-bold text-ocean-blue mb-6">Submit a Maintenance Request</h2><form onSubmit={handleSubmit} className="space-y-4"><input type="text" name="title" id="title" required onChange={handleChange} placeholder="e.g., Leaky tap in kitchen" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ocean-blue focus:border-ocean-blue"/><textarea name="description" id="description" rows="4" required onChange={handleChange} placeholder="Please provide as much detail as possible." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ocean-blue focus:border-ocean-blue"></textarea><div className="grid grid-cols-2 gap-4"><select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ocean-blue focus:border-ocean-blue">{categoryChoices.map(c => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}</select><select name="priority" id="priority" value={formData.priority} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ocean-blue focus:border-ocean-blue">{priorityChoices.map(p => <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700">Upload Photo (Optional)</label><div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><PhotoIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="photo" className="relative cursor-pointer bg-white rounded-md font-medium text-ocean-blue hover:text-blue-700 focus-within:outline-none"><span>Upload a file</span><input id="photo" name="photo" type="file" onChange={handleChange} className="sr-only" accept="image/png, image/jpeg" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">{formData.photo ? formData.photo.name : 'PNG, JPG up to 5MB'}</p></div></div></div>{requestError && <p className="text-sm text-red-600">{requestError}</p>}<div className="text-right pt-2"><button type="button" onClick={closeModal} className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" disabled={isSubmitting} className="bg-mountain-tan hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">{isSubmitting ? 'Submitting...' : 'Submit Request'}</button></div></form></div></div>
    );
};

const FeedbackModal = ({ request, closeModal, refreshData }) => {
    const { api } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) { setFeedbackError('Please select a star rating.'); return; }
        setIsSubmitting(true);
        setFeedbackError('');
        try {
            const response = await api.patch(`/maintenance-requests/${request.id}/feedback/`, { tenant_rating: rating, tenant_feedback: feedback });
            if (response.status === 200) {
                toastSuccess('Thank you for your feedback!');
                refreshData();
                closeModal();
            } else {
                throw new Error('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            const errorMessage = error.response?.data?.detail || 'Submission failed. Please try again.';
            toastError(errorMessage);
            setFeedbackError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"><div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg relative"><button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XMarkIcon className="h-6 w-6" /></button><h2 className="text-2xl font-bold text-ocean-blue mb-2">Leave Feedback</h2><p className="text-sm text-gray-600 mb-6">For request: "{request.title}"</p><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label><div className="flex space-x-1">{[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">{rating >= star ? <StarIconSolid className="h-8 w-8 text-yellow-400" /> : <StarIcon className="h-8 w-8 text-gray-300" />}</button>))}</div></div><div><label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Comments (Optional)</label><textarea name="feedback" id="feedback" rows="4" onChange={(e) => setFeedback(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-ocean-blue focus:border-ocean-blue"></textarea></div>{feedbackError && <p className="text-sm text-red-600">{feedbackError}</p>}<div className="text-right pt-2"><button type="button" onClick={closeModal} className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button><button type="submit" disabled={isSubmitting} className="bg-mountain-tan hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</button></div></form></div></div>
    );
};


// --- Main Dashboard Page Component ---

function DashboardPage() {
    const { user, loading: authLoading, api, fetchDashboardData, dashboardData, error: authError } = useAuth();
    const [isDownloading, setIsDownloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successInfo, setSuccessInfo] = useState({ show: false, title: '', message: '' });

    const showSuccessPopup = (title, message) => {
        setSuccessInfo({ show: true, title, message });
    };

    const closeSuccessPopup = () => {
        setSuccessInfo({ show: false, title: '', message: '' });
    };

    useEffect(() => {
        if (dashboardData?.announcements && dashboardData.announcements.length > 0) {
            setIsModalOpen(true);
        }
    }, [dashboardData]);
    
    const handleDownloadClick = async () => {
        setIsDownloading(true);
        try {
            const response = await api.get('/api/tenant/download-statement/', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const filename = `statement_${user.last_name}_${new Date().toISOString().split('T')[0]}.pdf`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toastSuccess("Statement downloaded successfully.");
        } catch (err) {
            toastError("Failed to download statement.");
            console.error("Download error:", err);
        }
        setIsDownloading(false);
    };

    const handleCancelApplication = async () => {
        if (!window.confirm("Are you sure you want to cancel your application? This action is permanent and cannot be undone.")) return;
        try {
            const response = await api.post('/api/application/cancel/');
            if (response.status === 200) {
                toastSuccess("Your application has been successfully cancelled.");
                fetchDashboardData();
            } else { throw new Error("Failed to cancel application."); }
        } catch (err) {
            toastError("An error occurred while trying to cancel your application.");
            console.error(err);
        }
    };

    const displayPhoneNumber = dashboardData?.tenant_details?.user?.phone_number || dashboardData?.application_details?.user?.phone_number || user?.phone_number;
    const displayStudentNumber = dashboardData?.tenant_details?.student_number || dashboardData?.application_details?.spu_student_number;

    const renderContent = () => {
        if (authLoading || !dashboardData) return <div className="text-center py-10 text-gray-600"><ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin mx-auto" /></div>;
        if (authError) return <div className="text-center py-10 bg-red-50 text-red-700 p-4 rounded-lg">{authError}</div>;
        
        if (dashboardData.is_tenant && dashboardData.tenant_details) {
            return dashboardData.tenant_details.is_active 
                ? <ActiveTenantView
                    tenant={dashboardData.tenant_details}
                    requests={dashboardData.maintenance_requests || []}
                    refreshData={fetchDashboardData}
                    onDownload={handleDownloadClick}
                    isDownloading={isDownloading}
                    showSuccessPopup={showSuccessPopup}
                  />
                : <InactiveTenantView
                    tenant={dashboardData.tenant_details}
                    onDownload={handleDownloadClick}
                    isDownloading={isDownloading}
                  />;
        } 
        else if (dashboardData.application_details) {
            return <ApplicantView application={dashboardData.application_details} onCancel={handleCancelApplication} refreshData={fetchDashboardData} showSuccessPopup={showSuccessPopup} />;
        } 
        else {
            return <NoApplicationView />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {isModalOpen && (
                <AnnouncementModal 
                    announcements={dashboardData?.announcements} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
            
            {successInfo.show && (
                <SuccessModal 
                    title={successInfo.title}
                    message={successInfo.message}
                    onClose={closeSuccessPopup}
                />
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                    
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="relative p-6 sm:p-8 rounded-2xl shadow-lg overflow-hidden bg-ocean-blue">
                             <div className="absolute inset-0">
                                <img src={applicationBanner} alt="Abstract background" className="w-full h-full object-cover opacity-20"/>
                            </div>
                            <div className="relative">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                                    <span className="font-light text-gray-200">Welcome,</span>
                                    <br/>
                                    {user?.first_name || 'Student'}!
                                </h1>
                                <p className="text-md text-gray-200 mt-4">This is your personal dashboard. Here you can track your application and tenancy details.</p>
                                
                                <div className="mt-8 border-t border-white/20 pt-6 space-y-4 text-sm">
                                    <div className="flex items-center text-gray-200">
                                        <EnvelopeIcon className="h-5 w-5 mr-3 text-white/80" />
                                        <span className="truncate">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center text-gray-200">
                                        <PhoneIcon className="h-5 w-5 mr-3 text-white/80" />
                                        <span>{displayPhoneNumber || 'Not provided'}</span>
                                    </div>
                                    {displayStudentNumber && (
                                        <div className="flex items-center text-gray-200">
                                            <AcademicCapIcon className="h-5 w-5 mr-3 text-white/80" />
                                            <span>{displayStudentNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl">
                            {renderContent()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DashboardPage;