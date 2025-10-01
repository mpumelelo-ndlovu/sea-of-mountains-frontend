// FILE: src/pages/ApplicationPage.jsx
// FINAL REVISED VERSION: Fixes the stepper layout on mobile devices.

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import InputField from '../components/InputField.jsx';
import applicationBanner from '../assets/hero-background.jpg';
import {
    DocumentTextIcon, UserCircleIcon, AcademicCapIcon,
    UsersIcon, BanknotesIcon, HeartIcon, ArrowUpTrayIcon,
    CheckIcon, ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon
} from '@heroicons/react/24/outline';

const nationalities = [ "South African", "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentinean", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Barbudans", "Batswana", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadoreann", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean"];

const steps = [
    { id: 1, name: 'Personal', icon: UserCircleIcon },
    { id: 2, name: 'Academic & Room', icon: AcademicCapIcon },
    { id: 3, name: 'Guardian', icon: UsersIcon },
    { id: 4, name: 'Funding', icon: BanknotesIcon },
    { id: 5, name: 'Medical & Vehicle', icon: HeartIcon },
    { id: 6, name: 'Documents', icon: ArrowUpTrayIcon },
];

const ProgressBar = ({ currentStep }) => (
    <nav aria-label="Progress">
        {/* THIS IS THE FIX: Changed to a flex layout with spacing */}
        <ol role="list" className="flex space-x-8">
            {steps.map((step) => (
                <li key={step.name} className="flex-1 min-w-[100px]">
                    {currentStep > step.id ? (
                        // Use top border for all screen sizes for consistency
                        <div className="group flex w-full flex-col border-t-4 border-ocean-blue py-2 transition-colors">
                            <span className="text-sm font-medium text-ocean-blue transition-colors">{`Step ${step.id}`}</span>
                            <span className="text-sm font-medium">{step.name}</span>
                        </div>
                    ) : currentStep === step.id ? (
                        <div className="flex w-full flex-col border-t-4 border-ocean-blue py-2" aria-current="step">
                            <span className="text-sm font-medium text-ocean-blue">{`Step ${step.id}`}</span>
                            <span className="text-sm font-medium">{step.name}</span>
                        </div>
                    ) : (
                        <div className="group flex h-full w-full flex-col border-t-4 border-gray-200 py-2 transition-colors">
                            <span className="text-sm font-medium text-gray-500 transition-colors">{`Step ${step.id}`}</span>
                            <span className="text-sm font-medium">{step.name}</span>
                        </div>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

const FormSection = ({ title, icon: Icon, children }) => (
    <div className="animate-fade-in">
        <div className="flex items-center text-ocean-blue mb-6">
            {Icon && <Icon className="h-8 w-8 mr-3 stroke-[1.5]" />}
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {children}
        </div>
    </div>
);

const SuccessModal = ({ message }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-sm transform transition-all animate-fade-in-up">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800">Application Submitted Successfully</h3>
            <p className="text-gray-600 mt-2 mb-6">{message}</p>
        </div>
    </div>
);

function ApplicationPage() {
    const { user, api, fetchDashboardData } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [roomTypes, setRoomTypes] = useState([]);
    const [areRoomsLoading, setAreRoomsLoading] = useState(true);
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '', phone_number: '', id_number: '', date_of_birth: '',
        gender: '', ethnicity: '', nationality: 'South African', resided_in_2025: '',
        address_line_1: '', city: '', postal_code: '', spu_student_number: '', course_of_study: '',
        year_of_study: '', preferred_room_type: '', floor_preference: '', preferred_move_in_date: '',
        guardian_full_name: '', guardian_relationship: '', guardian_phone_number: '', guardian_email: '',
        guardian_address: '', secondary_contact_name: '', secondary_contact_relationship: '', secondary_contact_phone: '',
        funding_source: '', nsfas_reference_number: '',
        nsfas_approval_document: null, bursary_name: '', bursary_contact_person: '', bursary_contact_email: '',
        bursary_contact_phone: '', bursary_coverage_amount: '', bursary_confirmation_letter: null,
        payer_full_name: '', payer_id_number: '', payer_relationship: '', payer_phone_number: '',
        payer_email: '', payer_address: '', payer_employment_details: '', payer_monthly_income: '',
        medical_conditions: '', has_vehicle: '', vehicle_details: '', id_document: null,
        proof_of_registration: null, proof_of_deposit: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev, first_name: user.first_name || '', last_name: user.last_name || '',
                email: user.email || '', phone_number: user.phone_number || '',
            }));
        }
    }, [user]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            setAreRoomsLoading(true);
            try {
                const response = await api.get('/api/room-types/');
                if (response.status === 200) setRoomTypes(response.data);
            } catch (error) { console.error("Error fetching room types:", error);
            } finally { setAreRoomsLoading(false); }
        };
        fetchRoomTypes();
    }, [api]);

    useEffect(() => {
        if (formData.nationality === 'South African' && /^\d{13}$/.test(formData.id_number)) {
            const year = parseInt(formData.id_number.substring(0, 2), 10);
            const month = formData.id_number.substring(2, 4);
            const day = formData.id_number.substring(4, 6);

            const currentYear = new Date().getFullYear() % 100;
            const fullYear = year > currentYear ? 1900 + year : 2000 + year;

            const newDob = `${fullYear}-${month}-${day}`;

            if (!isNaN(new Date(newDob))) {
                setFormData(prev => ({ ...prev, date_of_birth: newDob }));
            }
        }
    }, [formData.id_number, formData.nationality]);

    useEffect(() => {
        if (submitStatus === 'success') {
            const timer = setTimeout(async () => {
                await fetchDashboardData(); 
                navigate('/dashboard');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [submitStatus, navigate, fetchDashboardData]);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked, files } = e.target;
        
        let processedValue = value;
        if (type === 'file') {
            processedValue = files ? files[0] : null;
        } else if (type === 'checkbox') {
            processedValue = checked;
        } else if (name === 'has_vehicle') {
            processedValue = value === 'true';
        }
        
        setFormData(prev => ({ ...prev, [name]: processedValue }));

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [formErrors]);

    const validateStep = useCallback(() => {
        const errors = {};
        const today = new Date();
        const minBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

        if (currentStep === 1) {
            if (!formData.first_name) errors.first_name = 'First Name is required.';
            if (!formData.last_name) errors.last_name = 'Last Name is required.';
            if (!formData.email) errors.email = 'Email is required.';
            if (!formData.phone_number) errors.phone_number = 'Phone Number is required.';
            if (!formData.date_of_birth) {
                errors.date_of_birth = 'Date of Birth is required.';
            } else if (new Date(formData.date_of_birth) > minBirthDate) {
                 errors.date_of_birth = 'Applicant must be at least 16 years old.';
            }
            if (!formData.gender) errors.gender = 'Gender is required.';
            if (!formData.ethnicity) errors.ethnicity = 'Ethnicity is required.';
            if (!formData.nationality) errors.nationality = 'Nationality is required.';
            if (formData.resided_in_2025 === '') errors.resided_in_2025 = 'This field is required.';
            if (!formData.address_line_1) errors.address_line_1 = 'Address Line 1 is required.';
            if (!formData.city) errors.city = 'City is required.';
            if (!formData.postal_code) errors.postal_code = 'Postal Code is required.';
            
            if (!formData.id_number) {
                 errors.id_number = 'ID/Passport Number is required.';
            } else if (formData.nationality === 'South African') {
                if (!/^\d{13}$/.test(formData.id_number)) {
                    errors.id_number = 'South African ID must be 13 digits.';
                } else if (formData.date_of_birth) {
                    const dob = new Date(formData.date_of_birth);
                    const year = String(dob.getFullYear()).slice(-2);
                    const month = String(dob.getMonth() + 1).padStart(2, '0');
                    const day = String(dob.getDate()).padStart(2, '0');
                    const idDob = `${year}${month}${day}`;
                    if (formData.id_number.substring(0, 6) !== idDob) {
                        errors.id_number = 'The first 6 digits of your ID must match your Date of Birth.';
                    }
                }
            }
        } else if (currentStep === 2) {
            if (!formData.spu_student_number) {
                errors.spu_student_number = 'SPU Student Number is required.';
            } else if (!/^\d{9}$/.test(formData.spu_student_number)) {
                errors.spu_student_number = 'Student Number must be exactly 9 digits.';
            }
            if (!formData.course_of_study) errors.course_of_study = 'Course of Study is required.';
            if (!formData.year_of_study) errors.year_of_study = 'Year of Study is required.';
            if (!formData.preferred_room_type) errors.preferred_room_type = 'Preferred Room Type is required.';
            if (!formData.preferred_move_in_date) errors.preferred_move_in_date = 'Preferred Move-in Date is required.';
        } else if (currentStep === 3) {
            if (!formData.guardian_full_name) errors.guardian_full_name = 'Guardian Full Name is required.';
            if (!formData.guardian_relationship) errors.guardian_relationship = 'Guardian Relationship is required.';
            if (!formData.guardian_phone_number) errors.guardian_phone_number = 'Guardian Phone Number is required.';
            if (!formData.guardian_email) errors.guardian_email = 'Guardian Email is required.';
            if (!formData.guardian_address) errors.guardian_address = 'Guardian Address is required.';
        } else if (currentStep === 4) {
            if (!formData.funding_source) errors.funding_source = 'Funding Source is required.';
            if (formData.funding_source === 'NSFAS') {
                if (!formData.nsfas_reference_number) errors.nsfas_reference_number = 'NSFAS Reference Number is required.';
                if (!formData.nsfas_approval_document) errors.nsfas_approval_document = 'NSFAS Approval Document is required.';
            } else if (formData.funding_source === 'BURSARY') {
                if (!formData.bursary_name) errors.bursary_name = 'Bursary Name is required.';
                if (!formData.bursary_contact_person) errors.bursary_contact_person = 'Contact Person is required.';
                if (!formData.bursary_contact_email) errors.bursary_contact_email = 'Contact Email is required.';
                if (!formData.bursary_contact_phone) errors.bursary_contact_phone = 'Contact Phone is required.';
                if (!formData.bursary_coverage_amount) errors.bursary_coverage_amount = 'Coverage Amount is required.';
                if (!formData.bursary_confirmation_letter) errors.bursary_confirmation_letter = 'Bursary Confirmation Letter is required.';
            } else if (formData.funding_source === 'SELF_PAYING') {
                if (!formData.payer_full_name) errors.payer_full_name = 'Full Name is required.';
                if (!formData.payer_id_number) errors.payer_id_number = 'ID Number is required.';
                if (!formData.payer_relationship) errors.payer_relationship = 'Relationship to Student is required.';
                if (!formData.payer_phone_number) errors.payer_phone_number = 'Phone Number is required.';
                if (!formData.payer_email) errors.payer_email = 'Email is required.';
                if (!formData.payer_address) errors.payer_address = 'Address is required.';
                if (!formData.payer_employment_details) errors.payer_employment_details = 'Employment Details are required.';
                if (!formData.payer_monthly_income) errors.payer_monthly_income = 'Monthly Income is required.';
            }
        } else if (currentStep === 5) {
             if (formData.has_vehicle === '') {
                errors.has_vehicle = 'Please select an option for vehicle ownership.';
            } else if (formData.has_vehicle && !formData.vehicle_details) {
                errors.vehicle_details = 'Please provide your vehicle details.';
            }
        } else if (currentStep === 6) {
            if (!formData.id_document) errors.id_document = 'ID Document is required.';
            if (!formData.proof_of_registration) errors.proof_of_registration = 'Proof of Registration is required.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [currentStep, formData]);
    
    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => prev + 1);
        }
    };
    const handlePrevious = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) {
            setSubmitStatus('error');
            setSubmitMessage('Please correct the errors in the form.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage('');
        setFormErrors({});

        const submissionData = new FormData();

        if (formData.proof_of_deposit) {
            submissionData.append('proof_of_deposit', formData.proof_of_deposit);
        }
        
        for (const key in formData) {
            if (key !== 'proof_of_deposit' &&
                !key.startsWith('nsfas_') && !key.startsWith('bursary_') && !key.startsWith('payer_') &&
                !(formData[key] instanceof File) && formData[key] !== null && formData[key] !== ''
            ) {
                submissionData.append(key, formData[key]);
            }
        }

        if (formData.id_document) submissionData.append('id_document', formData.id_document);
        if (formData.proof_of_registration) submissionData.append('proof_of_registration', formData.proof_of_registration);
        

        const fundingSource = formData.funding_source;
        if (fundingSource === 'NSFAS') {
            const nsfasData = {
                reference_number: formData.nsfas_reference_number,
            };
            submissionData.append('nsfas_details', JSON.stringify(nsfasData));
            if (formData.nsfas_approval_document) {
                submissionData.append('nsfas_approval_document', formData.nsfas_approval_document);
            }
        } else if (fundingSource === 'BURSARY') {
            const bursaryData = {
                bursary_name: formData.bursary_name,
                coverage_amount: formData.bursary_coverage_amount,
                contact_person: formData.bursary_contact_person,
                contact_phone: formData.bursary_contact_phone,
                contact_email: formData.bursary_contact_email,
            };
            submissionData.append('bursary_details', JSON.stringify(bursaryData));
            if (formData.bursary_confirmation_letter) {
                submissionData.append('bursary_confirmation_letter', formData.bursary_confirmation_letter);
            }
        } else if (fundingSource === 'SELF_PAYING') {
            const payerData = {
                full_name: formData.payer_full_name,
                id_number: formData.payer_id_number,
                relationship_to_student: formData.payer_relationship,
                phone_number: formData.payer_phone_number,
                email: formData.payer_email,
                address: formData.payer_address,
                employment_details: formData.payer_employment_details,
                monthly_income: formData.payer_monthly_income,
            };
            submissionData.append('responsible_payer', JSON.stringify(payerData));
        }

        try {
            const response = await api.post('/api/application/create/', submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                setSubmitMessage('You will be redirected to your dashboard to track your application status...');
                setSubmitStatus('success');
            }
        } catch (error) {
            console.error('Submission Error:', error.response?.data || error.message);
            let detailedError = 'Please check the form for errors and try again.';
            const errorData = error.response?.data;

            if (errorData) {
                const newErrors = {};
                for (const key in errorData) {
                    if (Array.isArray(errorData[key])) {
                        newErrors[key] = errorData[key][0];
                    } else if (typeof errorData[key] === 'string') {
                        newErrors[key] = errorData[key];
                    }
                }
                setFormErrors(newErrors);

                if (errorData.detail) {
                    detailedError = errorData.detail;
                } else if (Object.keys(newErrors).length > 0) {
                    detailedError = 'Please correct the highlighted fields.';
                } else {
                    detailedError = 'An unexpected error occurred.';
                }
            }
            setSubmitStatus('error');
            setSubmitMessage(`Submission failed. ${detailedError}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return <SuccessModal message={submitMessage} />;
    }

    return (
        <div className="bg-gray-100 text-gray-800 font-sans">
             <section className="relative bg-ocean-blue text-white py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={applicationBanner} alt="Accommodation building" className="w-full h-full object-cover opacity-20"/>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div className="md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Hi {user?.first_name || 'there'}, let's get you started!
                        </h1>
                        <p className="text-lg text-gray-200 max-w-xl">
                            Welcome to your application for a new home at Sea of Mountains for 2026.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                         <div className="flex items-center">
                            <InformationCircleIcon className="h-10 w-10 text-white mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-left">Admin Fee Notice</h3>
                                <p className="text-sm text-gray-200 text-left">
                                    A non-refundable admin fee of <strong>R350</strong> is required to process your application. Please ensure you upload proof of payment in the final step.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12 overflow-x-auto pb-4 -mx-6 px-6">
                        <div className="relative inline-flex justify-start md:justify-center w-full">
                            <ProgressBar currentStep={currentStep} />
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-xl">
                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <FormSection title="Personal Information" icon={UserCircleIcon}>
                                    <InputField label="First Name" name="first_name" id="first_name" required value={formData.first_name} onChange={handleChange} error={formErrors.first_name} />
                                    <InputField label="Last Name" name="last_name" id="last_name" required value={formData.last_name} onChange={handleChange} error={formErrors.last_name} />
                                    <InputField label="Email Address" name="email" id="email" type="email" required value={formData.email} onChange={handleChange} error={formErrors.email} />
                                    <InputField label="Phone Number" name="phone_number" id="phone_number" type="tel" required value={formData.phone_number} onChange={handleChange} error={formErrors.phone_number} />

                                    <InputField label="Nationality" name="nationality" id="nationality" as="select" required value={formData.nationality} onChange={handleChange} error={formErrors.nationality}>
                                        {nationalities.map(nat => <option key={nat} value={nat}>{nat}</option>)}
                                    </InputField>

                                    <InputField
                                        label={formData.nationality === 'South African' ? 'ID Number' : 'Passport Number'}
                                        name="id_number"
                                        id="id_number"
                                        required
                                        value={formData.id_number}
                                        onChange={handleChange}
                                        error={formErrors.id_number}
                                    />

                                    <InputField label="Date of Birth" name="date_of_birth" id="date_of_birth" type="date" required value={formData.date_of_birth} onChange={handleChange} error={formErrors.date_of_birth} />
                                    <InputField label="Gender" name="gender" id="gender" as="select" required value={formData.gender} onChange={handleChange} error={formErrors.gender}>
                                        <option value="">Select Gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option>
                                    </InputField>
                                    <InputField label="Ethnicity" name="ethnicity" id="ethnicity" as="select" required value={formData.ethnicity} onChange={handleChange} error={formErrors.ethnicity}>
                                        <option value="">Select Ethnicity</option><option value="AFRICAN">African</option><option value="COLOURED">Coloured</option><option value="INDIAN">Indian</option><option value="WHITE">White</option><option value="OTHER">Other</option>
                                    </InputField>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Have you resided at Sea of Mountains in 2025? <span className="text-red-500">*</span></label>
                                        <div className="flex items-center space-x-6">
                                            <label className="flex items-center"><input type="radio" name="resided_in_2025" value="true" checked={formData.resided_in_2025 === 'true'} onChange={handleChange} required className="h-4 w-4 text-ocean-blue focus:ring-ocean-blue border-gray-300" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                                            <label className="flex items-center"><input type="radio" name="resided_in_2025" value="false" checked={formData.resided_in_2025 === 'false'} onChange={handleChange} required className="h-4 w-4 text-ocean-blue focus:ring-ocean-blue border-gray-300" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                                        </div>
                                        {formErrors.resided_in_2025 && <p className="mt-1 text-sm text-red-600">{formErrors.resided_in_2025}</p>}
                                    </div>
                                    <InputField label="Address Line 1" name="address_line_1" id="address_line_1" required value={formData.address_line_1} onChange={handleChange} fullWidth error={formErrors.address_line_1} />
                                    <InputField label="City" name="city" id="city" required value={formData.city} onChange={handleChange} error={formErrors.city} />
                                    <InputField label="Postal Code" name="postal_code" id="postal_code" required value={formData.postal_code} onChange={handleChange} error={formErrors.postal_code} />
                                </FormSection>
                            )}

                            {currentStep === 2 && (
                                <FormSection title="Academic & Room Preferences" icon={AcademicCapIcon}>
                                    <InputField label="SPU Student Number" name="spu_student_number" id="spu_student_number" required value={formData.spu_student_number} onChange={handleChange} error={formErrors.spu_student_number} />
                                    <InputField label="Course of Study" name="course_of_study" id="course_of_study" required value={formData.course_of_study} onChange={handleChange} error={formErrors.course_of_study} />
                                    <InputField label="Year of Study" name="year_of_study" id="year_of_study" as="select" required value={formData.year_of_study} onChange={handleChange} error={formErrors.year_of_study}>
                                        <option value="">Select Year</option>
                                        <option value="1ST">1st Year</option>
                                        <option value="2ND">2nd Year</option>
                                        <option value="3RD">3rd Year</option>
                                        <option value="4TH">4th Year</option>
                                        <option value="HONOURS">Honours</option>
                                        <option value="MASTERS">Masters</option>
                                        <option value="PHD">PhD</option>
                                    </InputField>
                                    <InputField label="Preferred Room Type" name="preferred_room_type" id="preferred_room_type" as="select" required value={formData.preferred_room_type} onChange={handleChange} error={formErrors.preferred_room_type}>
                                        <option value="">Select Room Type</option>
                                        {areRoomsLoading ? (
                                            <option value="" disabled>Loading room types...</option>
                                        ) : (
                                            roomTypes.map(room => (
                                                <option key={room.id} value={room.id}>{room.name} (R{room.monthly_rate}/month)</option>
                                            ))
                                        )}
                                    </InputField>
                                    <InputField label="Floor Preference" name="floor_preference" id="floor_preference" as="select" value={formData.floor_preference} onChange={handleChange} error={formErrors.floor_preference}>
                                        <option value="">Any</option>
                                        <option value="GROUND">Ground Floor</option>
                                        <option value="FIRST">First Floor</option>
                                        <option value="SECOND">Second Floor</option>
                                        <option value="THIRD">Third Floor</option>
                                    </InputField>
                                    <InputField label="Preferred Move-in Date" name="preferred_move_in_date" id="preferred_move_in_date" type="date" min="2026-01-01" required value={formData.preferred_move_in_date} onChange={handleChange} error={formErrors.preferred_move_in_date} />
                                </FormSection>
                            )}

                            {currentStep === 3 && (
                                <FormSection title="Guardian & Emergency Contacts" icon={UsersIcon}>
                                    <InputField label="Guardian Full Name" name="guardian_full_name" id="guardian_full_name" required value={formData.guardian_full_name} onChange={handleChange} error={formErrors.guardian_full_name} />
                                    <InputField label="Guardian Relationship" name="guardian_relationship" id="guardian_relationship" required value={formData.guardian_relationship} onChange={handleChange} error={formErrors.guardian_relationship} />
                                    <InputField label="Guardian Phone Number" name="guardian_phone_number" id="guardian_phone_number" type="tel" required value={formData.guardian_phone_number} onChange={handleChange} error={formErrors.guardian_phone_number} />
                                    <InputField label="Guardian Email" name="guardian_email" id="guardian_email" type="email" required value={formData.guardian_email} onChange={handleChange} error={formErrors.guardian_email} />
                                    <InputField label="Guardian Address" name="guardian_address" id="guardian_address" as="textarea" required value={formData.guardian_address} onChange={handleChange} fullWidth error={formErrors.guardian_address} />
                                    <InputField label="Secondary Contact Name" name="secondary_contact_name" id="secondary_contact_name" value={formData.secondary_contact_name} onChange={handleChange} error={formErrors.secondary_contact_name} />
                                    <InputField label="Secondary Contact Relationship" name="secondary_contact_relationship" id="secondary_contact_relationship" value={formData.secondary_contact_relationship} onChange={handleChange} error={formErrors.secondary_contact_relationship} />
                                    <InputField label="Secondary Contact Phone" name="secondary_contact_phone" id="secondary_contact_phone" type="tel" value={formData.secondary_contact_phone} onChange={handleChange} error={formErrors.secondary_contact_phone} />
                                </FormSection>
                            )}

                            {currentStep === 4 && (
                                <FormSection title="Funding Information" icon={BanknotesIcon}>
                                    <InputField label="Funding Source" name="funding_source" id="funding_source" as="select" required value={formData.funding_source} onChange={handleChange} error={formErrors.funding_source}>
                                        <option value="">Select Funding Source</option>
                                        <option value="NSFAS">NSFAS</option>
                                        <option value="BURSARY">Bursary</option>
                                        <option value="SELF_PAYING">Self-Paying</option>
                                    </InputField>

                                    {formData.funding_source === 'NSFAS' && (
                                        <>
                                            <InputField label="NSFAS Reference Number" name="nsfas_reference_number" id="nsfas_reference_number" required value={formData.nsfas_reference_number} onChange={handleChange} error={formErrors.nsfas_reference_number} />
                                            <InputField label="NSFAS Bursary Approval Screenshot (Proof)" name="nsfas_approval_document" id="nsfas_approval_document" as="file" accept="application/pdf,image/jpeg,image/png,image/gif" required onChange={handleChange} error={formErrors.nsfas_approval_document} />
                                        </>
                                    )}

                                    {formData.funding_source === 'BURSARY' && (
                                        <>
                                            <InputField label="Bursary Name" name="bursary_name" id="bursary_name" required value={formData.bursary_name} onChange={handleChange} error={formErrors.bursary_name} />
                                            <InputField label="Contact Person" name="bursary_contact_person" id="bursary_contact_person" required value={formData.bursary_contact_person} onChange={handleChange} error={formErrors.bursary_contact_person} />
                                            <InputField label="Contact Email" name="bursary_contact_email" id="bursary_contact_email" type="email" required value={formData.bursary_contact_email} onChange={handleChange} error={formErrors.bursary_contact_email} />
                                            <InputField label="Contact Phone" name="bursary_contact_phone" id="bursary_contact_phone" type="tel" required value={formData.bursary_contact_phone} onChange={handleChange} error={formErrors.bursary_contact_phone} />
                                            <InputField label="Coverage Amount" name="bursary_coverage_amount" id="bursary_coverage_amount" type="number" step="0.01" required value={formData.bursary_coverage_amount} onChange={handleChange} error={formErrors.bursary_coverage_amount} />
                                            <InputField label="Bursary Confirmation Letter (PDF)" name="bursary_confirmation_letter" id="bursary_confirmation_letter" as="file" accept="application/pdf" required onChange={handleChange} error={formErrors.bursary_confirmation_letter} />
                                        </>
                                    )}

                                    {formData.funding_source === 'SELF_PAYING' && (
                                        <>
                                            <InputField label="Payer Full Name" name="payer_full_name" id="payer_full_name" required value={formData.payer_full_name} onChange={handleChange} error={formErrors.payer_full_name} />
                                            <InputField label="Payer ID Number" name="payer_id_number" id="payer_id_number" required value={formData.payer_id_number} onChange={handleChange} error={formErrors.payer_id_number} />
                                            <InputField label="Relationship to Student" name="payer_relationship" id="payer_relationship" required value={formData.payer_relationship} onChange={handleChange} error={formErrors.payer_relationship} />
                                            <InputField label="Payer Phone Number" name="payer_phone_number" id="payer_phone_number" type="tel" required value={formData.payer_phone_number} onChange={handleChange} error={formErrors.payer_phone_number} />
                                            <InputField label="Payer Email" name="payer_email" id="payer_email" type="email" required value={formData.payer_email} onChange={handleChange} error={formErrors.payer_email} />
                                            <InputField label="Payer Address" name="payer_address" id="payer_address" as="textarea" required value={formData.payer_address} onChange={handleChange} fullWidth error={formErrors.payer_address} />
                                            <InputField label="Employment Details" name="payer_employment_details" id="payer_employment_details" as="textarea" required value={formData.payer_employment_details} onChange={handleChange} fullWidth error={formErrors.payer_employment_details} />
                                            <InputField label="Monthly Income" name="payer_monthly_income" id="payer_monthly_income" type="number" step="0.01" required value={formData.payer_monthly_income} onChange={handleChange} error={formErrors.payer_monthly_income} />
                                        </>
                                    )}
                                </FormSection>
                            )}

                            {currentStep === 5 && (
                                <FormSection title="Medical & Vehicle Information" icon={HeartIcon}>
                                    <InputField label="Medical Conditions (if any)" name="medical_conditions" id="medical_conditions" as="textarea" value={formData.medical_conditions} onChange={handleChange} fullWidth error={formErrors.medical_conditions} />
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a vehicle? <span className="text-red-500">*</span></label>
                                        <div className="flex items-center space-x-6">
                                            <label className="flex items-center"><input type="radio" name="has_vehicle" value="true" checked={formData.has_vehicle === true} onChange={handleChange} required className="h-4 w-4 text-ocean-blue focus:ring-ocean-blue border-gray-300" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                                            <label className="flex items-center"><input type="radio" name="has_vehicle" value="false" checked={formData.has_vehicle === false} onChange={handleChange} required className="h-4 w-4 text-ocean-blue focus:ring-ocean-blue border-gray-300" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                                        </div>
                                        {formErrors.has_vehicle && <p className="mt-1 text-sm text-red-600">{formErrors.has_vehicle}</p>}
                                    </div>
                                    {formData.has_vehicle && (
                                        <InputField label="Vehicle Details (e.g., Make, Model, License Plate)" name="vehicle_details" id="vehicle_details" as="textarea" required={formData.has_vehicle} value={formData.vehicle_details} onChange={handleChange} fullWidth error={formErrors.vehicle_details} />
                                    )}
                                </FormSection>
                            )}

                            {currentStep === 6 && (
                                <FormSection title="Required Documents" icon={ArrowUpTrayIcon}>
                                    <p className="md:col-span-2 text-gray-600">Please upload the following documents. Only PDF files are accepted.</p>
                                    <InputField label="ID Document (PDF)" name="id_document" id="id_document" as="file" accept="application/pdf" required onChange={handleChange} error={formErrors.id_document} />
                                    <InputField label="Proof of Registration (PDF)" name="proof_of_registration" id="proof_of_registration" as="file" accept="application/pdf" required onChange={handleChange} error={formErrors.proof_of_registration} />
                                    <InputField label="Proof of Admin Fee Payment (PDF)" name="proof_of_deposit" id="proof_of_deposit" as="file" accept="application/pdf" onChange={handleChange} error={formErrors.proof_of_deposit} />
                                </FormSection>
                            )}
                            
                            <div className="mt-10 flex justify-between">
                                {currentStep > 1 && (
                                    <button type="button" onClick={handlePrevious} className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                        Previous
                                    </button>
                                )}
                                <div className="ml-auto">
                                    {currentStep < steps.length && (
                                        <button type="button" onClick={handleNext} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-ocean-blue hover:bg-opacity-80">
                                            Next
                                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                                        </button>
                                    )}
                                    {currentStep === steps.length && (
                                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700">
                                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ApplicationPage;
