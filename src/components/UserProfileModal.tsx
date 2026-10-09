import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  LogOut,
  ShieldCheck,
  Crown,
  Settings,
  Save,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export const UserProfileModal: React.FC = () => {
  const {
    user,
    userProfile,
    isAuthModalOpen,
    setIsAuthModalOpen,
    logout,
    saveUserProfile,
    isStoreOwner
  } = useAuth();

  const { setIsAdminOpen } = useStore();

  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Sync profile details when opened or updated
  useEffect(() => {
    if (userProfile || user) {
      setDisplayName(userProfile?.displayName || user?.displayName || '');
      setPhone(userProfile?.phone || '');
      setAddress(userProfile?.address || '');
    }
  }, [userProfile, user, isAuthModalOpen]);

  if (!isAuthModalOpen || !user) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setIsEditingPhone(false);
    setIsEditingName(false);
    setIsEditingAddress(false);
    setSuccessMsg(null);
    setPhoneError(null);
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3500);
  };

  // Save phone number specifically (Optional: Add or Remove)
  const handleSavePhone = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPhoneError(null);

    const cleanPhone = phone.trim();
    // Validate if entered (must be 10 digits or empty)
    if (cleanPhone && cleanPhone.replace(/[^0-9]/g, '').length < 10) {
      setPhoneError('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें (उदा: 9876543210)');
      return;
    }

    setSaving(true);
    try {
      await saveUserProfile({ phone: cleanPhone });
      setIsEditingPhone(false);
      showNotification(cleanPhone ? '✅ मोबाइल नंबर सफलतापूर्वक सेव हो गया!' : '✅ मोबाइल नंबर हटा दिया गया');
    } catch (err) {
      console.error('Error saving phone:', err);
    } finally {
      setSaving(false);
    }
  };

  // Remove phone number
  const handleRemovePhone = async () => {
    setSaving(true);
    try {
      setPhone('');
      await saveUserProfile({ phone: '' });
      setIsEditingPhone(false);
      showNotification('✅ मोबाइल नंबर हटा दिया गया');
    } catch (err) {
      console.error('Error removing phone:', err);
    } finally {
      setSaving(false);
    }
  };

  // Save display name
  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSaving(true);
    try {
      await saveUserProfile({ displayName: displayName.trim() });
      setIsEditingName(false);
      showNotification('✅ नाम सफलतापूर्वक अपडेट हो गया!');
    } catch (err) {
      console.error('Error saving name:', err);
    } finally {
      setSaving(false);
    }
  };

  // Save delivery address
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveUserProfile({ address: address.trim() });
      setIsEditingAddress(false);
      showNotification('✅ डिलीवरी पता सुरक्षित कर लिया गया!');
    } catch (err) {
      console.error('Error saving address:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const currentSavedPhone = userProfile?.phone || '';
  const currentDisplayName = userProfile?.displayName || user.displayName || 'सम्मानित ग्राहक';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#1769E0] to-indigo-600 px-6 py-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            title="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Visual Banner */}
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={currentDisplayName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-white shadow-lg object-cover ring-2 ring-blue-300 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border-3 border-white flex items-center justify-center text-3xl font-extrabold text-white shrink-0 shadow-lg">
                {(currentDisplayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  ग्राहक प्रोफ़ाइल
                </span>
                {isStoreOwner && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] inline-flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    दुकानदार
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl sm:text-2xl font-extrabold truncate text-white leading-tight mt-0.5">
                {currentDisplayName}
              </h3>

              {/* Email */}
              <p className="text-xs sm:text-sm text-blue-100 truncate flex items-center gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span className="truncate">{user.email}</span>
              </p>

              {/* Google Verified pill */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-medium text-white border border-white/25">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Google से सुरक्षित लॉगिन</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Store Owner Quick Link */}
          {isStoreOwner && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-amber-950 truncate">दुकानदार एडमिन पैनल</div>
                  <div className="text-[11px] text-amber-700">सामान के भाव, QR कोड व सेटिंग बदलें</div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleClose();
                  setIsAdminOpen(true);
                }}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>खोलें</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 1. NAME SECTION (नाम) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-[#1769E0]" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  नाम (Customer Name)
                </span>
              </div>
              {!isEditingName && (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-[#1769E0] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>नाम बदलें</span>
                </button>
              )}
            </div>

            {isEditingName ? (
              <form onSubmit={handleSaveName} className="space-y-2 mt-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="अपना नाम दर्ज करें"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1769E0] focus:outline-none"
                  autoFocus
                  maxLength={100}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-1.5 bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सेव करें</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDisplayName(currentDisplayName);
                      setIsEditingName(false);
                    }}
                    className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    रद्द करें
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="font-extrabold text-slate-900 text-base">
                  {currentDisplayName}
                </span>
                <span className="text-[11px] text-slate-400">Google से प्राप्त</span>
              </div>
            )}
          </div>

          {/* 2. PHONE NUMBER SECTION (नंबर - नीचे में नंबर ऐड करेगा तो ऐड करेगा, नहीं करेगा तो कोई बात नहीं) */}
          <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <span>मोबाइल नंबर (Mobile Number)</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      ऐच्छिक (Optional)
                    </span>
                  </div>
                </div>
              </div>

              {!isEditingPhone && currentSavedPhone && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPhone(currentSavedPhone);
                      setIsEditingPhone(true);
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>बदलें</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemovePhone}
                    title="नंबर हटाएं"
                    className="text-xs text-red-600 hover:text-red-700 inline-flex items-center gap-0.5 cursor-pointer ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Helper Note for User */}
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              गूगल से आपका नाम आ चुका है। आप चाहें तो नीचे अपना 10 अंकों का मोबाइल नंबर जोड़ सकते हैं (ऑर्डर डिलीवरी और संपर्क के लिए)। <strong className="text-slate-800">अगर नहीं जोड़ना चाहते तो कोई बात नहीं</strong>, यह पूरी तरह ऐच्छिक है।
            </p>

            {phoneError && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{phoneError}</span>
              </div>
            )}

            {/* Display Mode: When phone already exists */}
            {!isEditingPhone && currentSavedPhone ? (
              <div className="bg-white p-3.5 rounded-xl border border-blue-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-slate-900 tracking-wider">
                      +91 {currentSavedPhone}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium">
                      सत्यापित संपर्क नंबर (ऑर्डर डिलीवरी हेतु सुरक्षित)
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Empty or Edit Form: When user wants to add or edit number */}
            {(isEditingPhone || !currentSavedPhone) && (
              <form onSubmit={handleSavePhone} className="space-y-3">
                {!currentSavedPhone && !isEditingPhone && (
                  <div className="text-xs text-amber-800 bg-amber-50/90 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
                    <span className="font-bold">ℹ️ अभी कोई नंबर नहीं जुड़ा है:</span>
                    <span>अगर जोड़ना चाहते हैं तो नीचे दर्ज करें।</span>
                  </div>
                )}

                <div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500 font-bold text-xs border-r border-slate-200 pr-2">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => {
                        // Allow only numbers, max 10
                        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                        setPhone(val);
                        setPhoneError(null);
                      }}
                      placeholder="10 अंकों का मोबाइल नंबर (उदा: 9876543210)"
                      maxLength={10}
                      className="w-full pl-20 pr-4 py-2.5 text-sm font-semibold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1769E0] focus:outline-none shadow-2xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#1769E0] to-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>
                      {saving ? 'सुरक्षित हो रहा है...' : (phone.trim() ? 'नंबर सुरक्षित करें (Save Number)' : 'खाली सेव करें')}
                    </span>
                  </button>

                  {isEditingPhone && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhone(currentSavedPhone);
                        setIsEditingPhone(false);
                        setPhoneError(null);
                      }}
                      className="px-3.5 py-2.5 border border-slate-300 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      रद्द करें
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* 3. OPTIONAL DELIVERY ADDRESS */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  डिलीवरी का पता (Address) — ऐच्छिक
                </span>
              </div>
              {!isEditingAddress && (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="text-xs text-[#1769E0] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{userProfile?.address ? 'बदलें' : 'पता जोड़ें'}</span>
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <form onSubmit={handleSaveAddress} className="space-y-2 mt-2">
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={2}
                  maxLength={500}
                  placeholder="गली, मोहल्ला, मकान नंबर, निकटतम लैंडमार्क (उदा: दुर्गा मंदिर के पास)..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1769E0] focus:outline-none resize-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-1.5 bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>पता सेव करें</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddress(userProfile?.address || '');
                      setIsEditingAddress(false);
                    }}
                    className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    रद्द करें
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-xs text-slate-700">
                {userProfile?.address ? (
                  <p className="font-semibold text-slate-800 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                    {userProfile.address}
                  </p>
                ) : (
                  <p className="text-slate-400 italic">
                    कोई पता नहीं जोड़ा गया (घर पर डिलीवरी के लिए आप चाहें तो पता जोड़ सकते हैं)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Account Security Info Note */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Google Auth सुरक्षा:</span> आपका खाता Google द्वारा पूरी तरह प्रमाणित है। आपकी जानकारी सुरक्षित रूप से Firebase में सहेजी गई है।
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-2xl border-2 border-red-200 bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>Google खाते से लॉगआउट करें (Sign Out)</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              लॉगआउट करने पर दोबारा दुकान में प्रवेश के लिए Google लॉगिन करना होगा।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
