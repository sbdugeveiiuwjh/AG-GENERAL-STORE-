import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Save,
  CheckCircle2,
  Upload,
  Camera,
  Image as ImageIcon,
  Search,
  CheckSquare,
  Square,
  AlertTriangle,
  MoveHorizontal,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/grocery';
import { compressAndResizeImage, COMMON_GROCERY_PHOTOS } from '../utils/imageUtils';

export const AdminModal: React.FC = () => {
  const {
    products,
    categories,
    storeSettings,
    isAdminOpen,
    setIsAdminOpen,
    updateProduct,
    addProduct,
    deleteProduct,
    updateSettings,
    resetToDefaults
  } = useStore();

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');

  // Product edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);

  useEffect(() => {
    setSettingsForm(storeSettings);
  }, [storeSettings, isAdminOpen]);

  // Swipe, Long Press, and Deletion state
  const [swipedProductId, setSwipedProductId] = useState<string | null>(null);
  const [longPressedProduct, setLongPressedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [longPressTimer, setLongPressTimer] = useState<any>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  // New product initial blank
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    nameHi: '',
    nameEn: '',
    categoryId: 'whole-spices',
    description: '',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    variants: [{ id: 'v-1', weight: '1 kg', price: 50 }],
    defaultVariantIndex: 0,
    inStock: true,
    isPopular: false
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '843471') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।');
    }
  };

  const handleImageUploadForEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    try {
      setUploadingImage(true);
      const compressed = await compressAndResizeImage(file);
      setEditingProduct({ ...editingProduct, image: compressed });
      setStatusMessage('सामान की फोटो अपलोड हो गई!');
      setTimeout(() => setStatusMessage(''), 2500);
    } catch {
      alert('फोटो प्रोसेस करने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUploadForNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const compressed = await compressAndResizeImage(file);
      setNewProd({ ...newProd, image: compressed });
      setStatusMessage('सामान की फोटो अपलोड हो गई!');
      setTimeout(() => setStatusMessage(''), 2500);
    } catch {
      alert('फोटो प्रोसेस करने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingQr(true);
      const compressed = await compressAndResizeImage(file, 800, 800, 0.9);
      setSettingsForm(prev => ({ ...prev, upiQrCodeImage: compressed }));
      setStatusMessage('दुकान का UPI QR कोड फोटो अपलोड हो गया! नीचे "सेटिंग्स सहेजें" पर क्लिक करें।');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch {
      alert('QR कोड फोटो प्रोसेस करने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setUploadingQr(false);
    }
  };

  const handleSaveProductEdit = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
    setStatusMessage('उत्पाद सफलतापूर्वक अपडेट किया गया! (Updated)');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleCreateProduct = () => {
    if (!newProd.nameHi.trim() || !newProd.nameEn.trim()) {
      alert('कृपया हिंदी और अंग्रेजी दोनों नाम भरें');
      return;
    }
    addProduct(newProd);
    setIsAddingNew(false);
    setStatusMessage('नया उत्पाद जोड़ा गया! (Added)');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Long press handlers
  const handleTouchStart = (product: Product) => {
    const timer = setTimeout(() => {
      setLongPressedProduct(product);
    }, 450);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const onRowTouchStart = (e: React.TouchEvent, product: Product) => {
    setTouchStartX(e.touches[0].clientX);
    handleTouchStart(product);
  };

  const onRowTouchMove = () => {
    handleTouchEnd();
  };

  const onRowTouchEnd = (e: React.TouchEvent, productId: string) => {
    handleTouchEnd();
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      // Swiped left -> reveal action buttons
      setSwipedProductId(productId);
    } else if (diff < -40) {
      // Swiped right -> close
      if (swipedProductId === productId) setSwipedProductId(null);
    }
  };

  const confirmDelete = (product: Product) => {
    deleteProduct(product.id);
    setProductToDelete(null);
    if (longPressedProduct?.id === product.id) setLongPressedProduct(null);
    if (swipedProductId === product.id) setSwipedProductId(null);
    setStatusMessage(`"${product.nameHi}" हटा दिया गया!`);
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedProductIds.length === 0) return;
    if (confirm(`क्या आप सचमुच चुने गए ${selectedProductIds.length} सामानों को लिस्ट से हटाना चाहते हैं?`)) {
      selectedProductIds.forEach(id => deleteProduct(id));
      setSelectedProductIds([]);
      setBulkMode(false);
      setStatusMessage(`${selectedProductIds.length} सामान हटा दिए गए!`);
      setTimeout(() => setStatusMessage(''), 2500);
    }
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    setStatusMessage('स्टोर सेटिंग्स सहेज ली गईं! (Saved)');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                दुकानदार पोर्टल (Store Manager & Admin)
              </h3>
              <p className="text-xs text-slate-300">
                सामान, भाव, स्टॉक और WhatsApp नंबर प्रबंधित करें
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-[#1769E0] rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-lg">
                दुकानदार पासवर्ड दर्ज करें
              </h4>
              <p className="text-xs text-slate-500 font-devanagari mt-1">
                यह पोर्टल केवल अधिकृत दुकान संचालक के लिए सुरक्षित है।
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                maxLength={12}
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="पासवर्ड दर्ज करें"
                className="w-full text-center text-lg tracking-widest py-2.5 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 font-semibold">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-[#1769E0] hover:bg-blue-700 text-white transition-colors"
              >
                लॉगिन करें (Login)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Status notification */}
            {statusMessage && (
              <div className="bg-emerald-500 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Sub-navigation tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 bg-slate-50">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'products'
                      ? 'border-[#1769E0] text-[#1769E0]'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  सामान एवं भाव सूची ({products.length} Products)
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'settings'
                      ? 'border-[#1769E0] text-[#1769E0]'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  दुकान विवरण व WhatsApp सेटिंग्स
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm('क्या आप सभी उत्पाद और सेटिंग्स मूल स्थिति (Default) में रीसेट करना चाहते हैं?')) {
                    resetToDefaults();
                    setStatusMessage('डेटा रीसेट कर दिया गया');
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                title="Reset to initial seed data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            </div>

            {/* Scrollable Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {activeTab === 'products' && (
                <div className="space-y-6">
                  
                  {/* Edit Single Product Modal/Panel */}
                  {editingProduct && (
                    <div className="bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          उत्पाद संपादित करें (Edit: {editingProduct.nameHi})
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          रद्द करें ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-semibold block mb-1">नाम (हिंदी):</label>
                          <input
                            type="text"
                            value={editingProduct.nameHi}
                            onChange={e =>
                              setEditingProduct({ ...editingProduct, nameHi: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Name (English):</label>
                          <input
                            type="text"
                            value={editingProduct.nameEn}
                            onChange={e =>
                              setEditingProduct({ ...editingProduct, nameEn: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">वर्ग (Category):</label>
                          <select
                            value={editingProduct.categoryId}
                            onChange={e =>
                              setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          >
                            {categories.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.nameHi} ({c.nameEn})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">स्टॉक स्थिति:</label>
                          <select
                            value={editingProduct.inStock ? 'true' : 'false'}
                            onChange={e =>
                              setEditingProduct({
                                ...editingProduct,
                                inStock: e.target.value === 'true'
                              })
                            }
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
                          >
                            <option value="true">उपलब्ध (In Stock)</option>
                            <option value="false">स्टॉक समाप्त (Out of Stock)</option>
                          </select>
                        </div>
                      </div>

                      {/* Variants & Prices */}
                      <div>
                        <label className="font-bold text-xs block mb-1 text-slate-800">
                          वज़न एवं कीमतें (Variants & Prices in ₹):
                        </label>
                        <div className="space-y-2">
                          {editingProduct.variants.map((v, idx) => (
                            <div key={v.id} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={v.weight}
                                onChange={e => {
                                  const updated = [...editingProduct.variants];
                                  updated[idx].weight = e.target.value;
                                  setEditingProduct({ ...editingProduct, variants: updated });
                                }}
                                placeholder="Weight (e.g. 1 kg)"
                                className="w-1/2 p-2 bg-white border border-slate-300 rounded-lg text-xs"
                              />
                              <div className="flex items-center gap-1 w-1/2">
                                <span className="font-bold text-slate-500">₹</span>
                                <input
                                  type="number"
                                  value={v.price}
                                  onChange={e => {
                                    const updated = [...editingProduct.variants];
                                    updated[idx].price = Number(e.target.value);
                                    setEditingProduct({ ...editingProduct, variants: updated });
                                  }}
                                  placeholder="Price"
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Photo Upload & Preview */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-[#1769E0]" />
                            <span>सामान की फोटो अपलोड करें (Product Photo):</span>
                          </label>
                          {editingProduct.image && (
                            <span className="text-[11px] text-emerald-700 font-semibold">
                              ✓ फोटो सेट है
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          {/* Image Preview */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0 shadow-2xs">
                            <img
                              src={editingProduct.image}
                              alt="Product Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Upload Buttons */}
                          <div className="flex-1 w-full space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="cursor-pointer inline-flex items-center gap-1.5 bg-[#1769E0] hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shadow-2xs">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingImage ? 'अपलोड हो रहा है...' : '📷 मोबाइल कैमरा / गैलरी से फोटो चुनें'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUploadForEdit}
                                  disabled={uploadingImage}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[11px] text-slate-400">या लिंक डालें:</span>
                            </div>

                            <input
                              type="text"
                              value={editingProduct.image}
                              onChange={e =>
                                setEditingProduct({ ...editingProduct, image: e.target.value })
                              }
                              placeholder="https://... इमेज का सीधा वेब लिंक"
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Presets */}
                        <div>
                          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                            या नीचे से उपयुक्त फोटो चुनें (Quick Stock Photos):
                          </span>
                          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar">
                            {COMMON_GROCERY_PHOTOS.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  setEditingProduct({ ...editingProduct, image: item.url })
                                }
                                className={`text-[11px] px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                                  editingProduct.image === item.url
                                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                }`}
                              >
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300"
                        >
                          रद्द करें
                        </button>
                        <button
                          onClick={handleSaveProductEdit}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1769E0] text-white hover:bg-blue-700 flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>बदलाव सहेजें (Save Changes)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Product Form */}
                  {isAddingNew && (
                    <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          नया उत्पाद जोड़ें (Add New Product)
                        </h4>
                        <button
                          onClick={() => setIsAddingNew(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-semibold block mb-1">नाम (हिंदी):</label>
                          <input
                            type="text"
                            value={newProd.nameHi}
                            onChange={e => setNewProd({ ...newProd, nameHi: e.target.value })}
                            placeholder="उदा: राजमा चित्रा"
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Name (English):</label>
                          <input
                            type="text"
                            value={newProd.nameEn}
                            onChange={e => setNewProd({ ...newProd, nameEn: e.target.value })}
                            placeholder="e.g. Rajma Chitra"
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">वर्ग (Category):</label>
                          <select
                            value={newProd.categoryId}
                            onChange={e => setNewProd({ ...newProd, categoryId: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                          >
                            {categories.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.nameHi} ({c.nameEn})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">वज़न व कीमत (₹):</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newProd.variants[0].weight}
                              onChange={e =>
                                setNewProd({
                                  ...newProd,
                                  variants: [{ ...newProd.variants[0], weight: e.target.value }]
                                })
                              }
                              placeholder="1 kg"
                              className="w-1/2 p-2 bg-white border border-slate-300 rounded-lg"
                            />
                            <input
                              type="number"
                              value={newProd.variants[0].price}
                              onChange={e =>
                                setNewProd({
                                  ...newProd,
                                  variants: [{ ...newProd.variants[0], price: Number(e.target.value) }]
                                })
                              }
                              placeholder="Price"
                              className="w-1/2 p-2 bg-white border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Photo Upload & Preview for New Product */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-600" />
                            <span>सामान की फोटो (Product Photo Upload):</span>
                          </label>
                          {newProd.image && (
                            <span className="text-[11px] text-emerald-700 font-semibold">
                              ✓ फोटो चयनित है
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          {/* Image Preview */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0 shadow-2xs">
                            <img
                              src={newProd.image}
                              alt="New Product Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Upload Buttons */}
                          <div className="flex-1 w-full space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="cursor-pointer inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shadow-2xs">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingImage ? 'अपलोड हो रहा है...' : '📷 मोबाइल कैमरा / गैलरी से फोटो अपलोड करें'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUploadForNew}
                                  disabled={uploadingImage}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[11px] text-slate-400">या लिंक डालें:</span>
                            </div>

                            <input
                              type="text"
                              value={newProd.image}
                              onChange={e => setNewProd({ ...newProd, image: e.target.value })}
                              placeholder="https://... इमेज का सीधा वेब लिंक"
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Presets */}
                        <div>
                          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                            या नीचे से उपयुक्त फोटो चुनें (Quick Stock Photos):
                          </span>
                          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar">
                            {COMMON_GROCERY_PHOTOS.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setNewProd({ ...newProd, image: item.url })}
                                className={`text-[11px] px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                                  newProd.image === item.url
                                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                }`}
                              >
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setIsAddingNew(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300"
                        >
                          रद्द करें
                        </button>
                        <button
                          onClick={handleCreateProduct}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-[#16A34A] text-white hover:bg-emerald-700 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>उत्पाद जोड़ें (Add Product)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add Product Button */}
                  {!editingProduct && !isAddingNew && (
                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 text-[#1769E0] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-blue-50/50 hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ नया किराना सामान जोड़ें (+ Add New Product)</span>
                    </button>
                  )}

                  {/* Search & Bulk Deletion Toolbar */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      {/* Search in Admin */}
                      <div className="relative w-full sm:w-72">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={adminSearch}
                          onChange={e => setAdminSearch(e.target.value)}
                          placeholder="सामान खोजें (उदा: धनिया, जीरा)..."
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                        {adminSearch && (
                          <button
                            onClick={() => setAdminSearch('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Bulk Selection Toggle */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setBulkMode(!bulkMode);
                            setSelectedProductIds([]);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                            bulkMode
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>{bulkMode ? 'मल्टी-चयन बंद करें' : 'कई सामान एक साथ हटाएं (Bulk Delete)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Bulk Action Bar when items selected */}
                    {bulkMode && (
                      <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 flex items-center justify-between text-xs animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = products.filter(p =>
                                !adminSearch ||
                                p.nameHi.toLowerCase().includes(adminSearch.toLowerCase()) ||
                                p.nameEn.toLowerCase().includes(adminSearch.toLowerCase())
                              );
                              if (selectedProductIds.length === filtered.length) {
                                setSelectedProductIds([]);
                              } else {
                                setSelectedProductIds(filtered.map(p => p.id));
                              }
                            }}
                            className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                          >
                            <CheckSquare className="w-3.5 h-3.5 text-rose-600" />
                            <span>सब चुनें / हटाएं</span>
                          </button>
                          <span className="text-slate-400">|</span>
                          <span className="font-semibold text-rose-800">
                            {selectedProductIds.length} सामान चयनित
                          </span>
                        </div>

                        {selectedProductIds.length > 0 && (
                          <button
                            type="button"
                            onClick={handleBulkDelete}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-md shadow-2xs flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>चुने गए {selectedProductIds.length} सामान हटाएं</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Touch & Swipe Helper Hint */}
                    <div className="text-[11px] text-slate-500 font-devanagari flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-slate-100">
                      <span>💡 <b>सुझाव:</b> सामान पर <b>लॉन्ग प्रेस (दबाए रखें)</b> या <b>बाईं ओर स्लाइड (Swipe Left)</b> करके सीधे डिलीट/एडिट करें।</span>
                      <span>कुल {products.length} सामान</span>
                    </div>
                  </div>

                  {/* Swipeable & Long-pressable Product List */}
                  <div className="space-y-2.5">
                    {products
                      .filter(p =>
                        !adminSearch ||
                        p.nameHi.toLowerCase().includes(adminSearch.toLowerCase()) ||
                        p.nameEn.toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map(p => {
                        const isSwiped = swipedProductId === p.id;
                        const isSelected = selectedProductIds.includes(p.id);

                        return (
                          <div
                            key={p.id}
                            className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-2xs select-none"
                          >
                            {/* Hidden Action Buttons behind the slide */}
                            <div className="absolute inset-y-0 right-0 flex items-center z-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setSwipedProductId(null);
                                  setEditingProduct(p);
                                }}
                                className="h-full px-4 bg-[#1769E0] text-white font-bold text-xs flex flex-col items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                                <span>एडिट</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSwipedProductId(null);
                                  setProductToDelete(p);
                                }}
                                className="h-full px-4 bg-rose-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 hover:bg-rose-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>डिलीट</span>
                              </button>
                            </div>

                            {/* Front Sliding Row */}
                            <div
                              onTouchStart={e => onRowTouchStart(e, p)}
                              onTouchMove={onRowTouchMove}
                              onTouchEnd={e => onRowTouchEnd(e, p.id)}
                              onContextMenu={e => {
                                e.preventDefault();
                                setLongPressedProduct(p);
                              }}
                              className={`relative z-10 p-3 sm:p-3.5 bg-white transition-transform duration-200 flex items-center justify-between gap-3 ${
                                isSwiped ? '-translate-x-32 sm:-translate-x-36' : 'translate-x-0'
                              } ${isSelected ? 'bg-rose-50/70 border-l-4 border-rose-500' : ''}`}
                            >
                              {/* Bulk Checkbox */}
                              {bulkMode && (
                                <button
                                  type="button"
                                  onClick={() => toggleSelectProduct(p.id)}
                                  className="text-slate-400 hover:text-slate-700 shrink-0"
                                >
                                  {isSelected ? (
                                    <CheckSquare className="w-5 h-5 text-rose-600" />
                                  ) : (
                                    <Square className="w-5 h-5 text-slate-300" />
                                  )}
                                </button>
                              )}

                              {/* Thumbnail Image */}
                              <img
                                src={p.image}
                                alt={p.nameHi}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                              />

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-slate-900 text-sm font-devanagari truncate">
                                    {p.nameHi}
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateProduct({ ...p, inStock: !p.inStock })
                                    }
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                                      p.inStock
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-rose-100 text-rose-800'
                                    }`}
                                  >
                                    {p.inStock ? 'उपलब्ध' : 'समाप्त'}
                                  </button>
                                </div>

                                <div className="text-xs text-slate-500 truncate">
                                  {p.nameEn} · {categories.find(c => c.id === p.categoryId)?.nameHi || p.categoryId}
                                </div>

                                {/* Variants Prices */}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {p.variants.map((v, i) => (
                                    <span
                                      key={i}
                                      className="inline-block text-[11px] bg-slate-100 px-1.5 py-0.2 rounded font-medium text-slate-700"
                                    >
                                      {v.weight}: <b>₹{v.price}</b>
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons & Slide Toggle */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                {/* Slide Toggle button */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSwipedProductId(isSwiped ? null : p.id)
                                  }
                                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                                    isSwiped
                                      ? 'bg-slate-800 text-white border-slate-800'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                  }`}
                                  title="स्लाइड एक्शन दिखाएं/छिपाएं"
                                >
                                  <MoveHorizontal className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">
                                    {isSwiped ? 'बंद' : 'स्लाइड'}
                                  </span>
                                </button>

                                {/* Direct Edit Button */}
                                <button
                                  type="button"
                                  onClick={() => setEditingProduct(p)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="एडिट करें"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>

                                {/* Direct Delete Button */}
                                <button
                                  type="button"
                                  onClick={() => setProductToDelete(p)}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="डिलीट करें"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                </div>
              )}

              {/* Delete Confirmation Modal */}
              {productToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                  <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        सामान डिलीट करें? (Confirm Delete)
                      </h4>
                      <p className="text-xs text-slate-500 font-devanagari mt-1">
                        क्या आप सचमुच <b>"{productToDelete.nameHi}"</b> को दुकान की लिस्ट से हटाना चाहते हैं?
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-left">
                      <img
                        src={productToDelete.image}
                        alt={productToDelete.nameHi}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 font-devanagari">
                          {productToDelete.nameHi}
                        </div>
                        <div className="text-slate-500">{productToDelete.nameEn}</div>
                        <div className="font-bold text-[#1769E0] mt-0.5">
                          ₹{productToDelete.variants[0]?.price} ({productToDelete.variants[0]?.weight})
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setProductToDelete(null)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        रद्द करें (Cancel)
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmDelete(productToDelete)}
                        className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-xs"
                      >
                        हाँ, डिलीट करें
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Long Press Quick Action Sheet Modal */}
              {longPressedProduct && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                  <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={longPressedProduct.image}
                          alt={longPressedProduct.nameHi}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm font-devanagari">
                            {longPressedProduct.nameHi}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            त्वरित कार्रवाई (Quick Actions)
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setLongPressedProduct(null)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {/* Delete Option */}
                      <button
                        type="button"
                        onClick={() => {
                          const prod = longPressedProduct;
                          setLongPressedProduct(null);
                          setProductToDelete(prod);
                        }}
                        className="w-full p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-rose-600" />
                          <span>यह सामान डिलीट करें (Delete Product)</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Edit Option */}
                      <button
                        type="button"
                        onClick={() => {
                          const prod = longPressedProduct;
                          setLongPressedProduct(null);
                          setEditingProduct(prod);
                        }}
                        className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1769E0] font-bold text-xs flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          <span>नाम, फोटो या भाव एडिट करें (Edit Product)</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Stock Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          updateProduct({
                            ...longPressedProduct,
                            inStock: !longPressedProduct.inStock
                          });
                          setLongPressedProduct(null);
                          setStatusMessage('स्टॉक स्थिति बदल दी गई!');
                          setTimeout(() => setStatusMessage(''), 2000);
                        }}
                        className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors"
                      >
                        <span>
                          स्टॉक स्थिति: <b>{longPressedProduct.inStock ? 'समाप्त करें (Mark Out of Stock)' : 'उपलब्ध करें (Mark In Stock)'}</b>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLongPressedProduct(null)}
                      className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-700"
                    >
                      रद्द करें (Close)
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      दुकान का नाम (Store Name):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, storeName: e.target.value })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      WhatsApp ऑर्डर नंबर (Digits only with 91):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                      }
                      placeholder="917366942823"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      वर्तमान नंबर: +91 73669 42823 (ग्राहक द्वारा क्लिक करने पर इसी नंबर पर मैसेज जाएगा)
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      कॉलिंग फोन नंबर:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, phone: e.target.value })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      बंद होने का समय (Closing Time):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.closingTime}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, closingTime: e.target.value })
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      UPI ID (पेमेंट QR कोड के लिए):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.upiId || ''}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, upiId: e.target.value })
                      }
                      placeholder="उदा: 7366942823@upi"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      ग्राहक इस UPI ID से PhonePe, Google Pay, Paytm पर सीधा पेमेंट कर सकते हैं।
                    </p>
                  </div>

                  {/* QR Code Upload & Management */}
                  <div className="bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-4 sm:p-5 space-y-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#1769E0]" />
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                            दुकान का UPI QR कोड अपलोड व अपडेट करें (Store UPI QR Code):
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-600 font-devanagari mt-1">
                          यहाँ अपने PhonePe, Google Pay, Paytm या बैंक स्कैनर का QR फोटो अपलोड करें। वेबसाइट के होम पेज पर ग्राहक इसी QR कोड को देखकर पेमेंट करेंगे।
                        </p>
                      </div>

                      {settingsForm.upiQrCodeImage ? (
                        <span className="shrink-0 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                          ✓ कस्टम QR कोड सेट है
                        </span>
                      ) : (
                        <span className="shrink-0 bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          सिस्टम QR सक्रिय
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                      {/* Live QR Preview */}
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-50 border-2 border-dashed border-blue-300 p-2 shrink-0 flex items-center justify-center">
                        {settingsForm.upiQrCodeImage ? (
                          <img
                            src={settingsForm.upiQrCodeImage}
                            alt="Store UPI QR Code"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                              `upi://pay?pa=${encodeURIComponent(
                                settingsForm.upiId || '7366942823@upi'
                              )}&pn=${encodeURIComponent(settingsForm.storeName)}&cu=INR`
                            )}`}
                            alt="Generated UPI QR"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 w-full space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 bg-[#1769E0] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>
                              {uploadingQr ? 'QR कोड अपलोड हो रहा है...' : '📷 मोबाइल कैमरा / गैलरी से QR कोड अपलोड करें'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleQrUpload}
                              disabled={uploadingQr}
                              className="hidden"
                            />
                          </label>

                          {settingsForm.upiQrCodeImage && (
                            <button
                              type="button"
                              onClick={() => {
                                setSettingsForm(prev => ({ ...prev, upiQrCodeImage: '' }));
                                setStatusMessage('कस्टम QR कोड हटा दिया गया (डिफ़ॉल्ट सिस्टम QR सक्रिय)');
                                setTimeout(() => setStatusMessage(''), 2500);
                              }}
                              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 transition-colors"
                            >
                              QR फोटो हटाएं
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                            या QR इमेज का सीधा वेब लिंक (URL) डालें:
                          </label>
                          <input
                            type="text"
                            value={settingsForm.upiQrCodeImage || ''}
                            onChange={e =>
                              setSettingsForm(prev => ({ ...prev, upiQrCodeImage: e.target.value }))
                            }
                            placeholder="https://... इमेज का सीधा वेब लिंक"
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      हेडर लाइव घोषणा / सूचना (Announcement Banner):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.announcement || ''}
                      onChange={e =>
                        setSettingsForm({ ...settingsForm, announcement: e.target.value })
                      }
                      placeholder="उदा: ताजा चक्की आटा, शुद्ध सरसों तेल उपलब्ध है!"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-devanagari"
                    />
                    <label className="flex items-center gap-2 mt-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.announcementActive}
                        onChange={e =>
                          setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })
                        }
                        className="rounded text-[#1769E0]"
                      />
                      <span>वेबसाइट हेडर में यह सूचना दिखाएं</span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveSettings}
                      className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#1769E0] hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>सेटिंग्स सहेजें (Save Store Settings)</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
