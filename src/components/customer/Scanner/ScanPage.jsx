import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { Breadcrumb } from '../../common/Breadcrumb';
import { SmartScoreBadge } from '../../common/SmartScoreBadge';

export const ScanPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [scannedProduct, setScannedProduct] = useState(null);

  const presetBarcodes = [
    { code: '8901058852101', label: 'Aashirvaad Atta (8901058852101)' },
    { code: '8901262010052', label: 'Amul Taaza Milk (8901262010052)' },
    { code: '8901058001019', label: 'Tata Tea Premium (8901058001019)' },
    { code: '8901030612345', label: 'Surf Excel Powder (8901030612345)' },
    { code: '8901262020013', label: 'Amul Pure Cow Ghee (8901262020013)' }
  ];

  const handleStartScanner = () => {
    setIsScanning(true);
    setScannedProduct(null);

    // Simulate scanning camera pick after 1.5 seconds
    setTimeout(async () => {
      const sampleCode = presetBarcodes[Math.floor(Math.random() * presetBarcodes.length)].code;
      const res = await productService.getProductByBarcode(sampleCode);
      if (res.success) {
        setScannedProduct(res.data);
        showToast(`Barcode ${sampleCode} scanned!`, 'success');
      }
      setIsScanning(false);
    }, 1500);
  };

  const handleManualScan = async (codeToUse) => {
    const code = codeToUse || manualBarcode;
    if (!code) return;

    setIsScanning(true);
    const res = await productService.getProductByBarcode(code);
    setIsScanning(false);

    if (res.success && res.data) {
      setScannedProduct(res.data);
      showToast(`Scanned Barcode #${code}`, 'success');
    }
  };

  const handleAddScannedToCart = () => {
    if (scannedProduct) {
      addToCart(scannedProduct, 1);
      showToast(`Added ${scannedProduct.name} to cart`, 'success');
    }
  };

  return (
    <div className="container py-4 max-w-3xl">
      <Breadcrumb items={[{ label: 'Barcode Scanner' }]} />

      {/* Header Banner */}
      <div className="bg-dark text-white p-4 rounded-4 shadow mb-4 text-center">
        <span className="badge bg-warning text-dark fw-bold mb-2">IN-STORE SUPERMARKET INNOVATION</span>
        <h2 className="fw-bold font-heading mb-1 text-white">Digital Barcode Scanner</h2>
        <p className="text-secondary small mb-0">
          Point device camera at any product barcode on physical supermarket shelves to view instant price comparison &amp; add directly to cart.
        </p>
      </div>

      {/* SCANNER VIEWPORT */}
      <div className="bg-white p-4 rounded-4 border shadow-sm text-center mb-4">
        <div className="scanner-container mb-3 position-relative">
          {isScanning ? (
            <>
              <div className="scanner-laser"></div>
              <div className="position-absolute top-50 start-50 translate-middle text-white fw-bold bg-dark bg-opacity-75 px-3 py-2 rounded">
                <span className="spinner-border spinner-border-sm me-2 text-danger"></span>
                Scanning Barcode...
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-secondary">
              <i className="bi bi-qr-code-scan display-2 text-danger mb-2"></i>
              <div className="fw-bold text-white">Scan a product barcode</div>
              <div className="small text-muted">Align barcode within the viewport area</div>
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          <button className="btn btn-smartmart-primary btn-lg px-4" onClick={handleStartScanner} disabled={isScanning}>
            <i className="bi bi-camera me-2"></i> {isScanning ? 'Scanning...' : 'Start Camera Scanner'}
          </button>
        </div>

        {/* PRESET BARCODE SIMULATOR */}
        <div className="border-top pt-3 text-start">
          <label className="fw-bold small text-muted text-uppercase mb-2">Simulate Barcode Scan (Click to Test):</label>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {presetBarcodes.map((b, i) => (
              <button key={i} className="btn btn-sm btn-outline-secondary" onClick={() => handleManualScan(b.code)}>
                <i className="bi bi-upc-scan me-1"></i> {b.label}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleManualScan(); }} className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Or enter barcode manually e.g. 8901058852101"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">Scan Code</button>
          </form>
        </div>
      </div>

      {/* SCANNED RESULT POPUP CARD */}
      {scannedProduct && (
        <div className="bg-white p-4 rounded-4 border border-danger shadow-lg">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
            <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i> Barcode Matched!</span>
            <span className="small text-muted">SKU: {scannedProduct.sku}</span>
          </div>

          <div className="row align-items-center g-3">
            <div className="col-md-4 text-center bg-light p-2 rounded">
              <img src={scannedProduct.image} alt={scannedProduct.name} className="img-fluid" style={{ maxHeight: '160px', objectFit: 'contain' }} />
            </div>

            <div className="col-md-8">
              <span className="text-uppercase text-muted fw-bold small">{scannedProduct.brand}</span>
              <h5 className="fw-bold text-dark mb-1">{scannedProduct.name}</h5>
              <div className="small text-muted mb-2">Pack: {scannedProduct.packSize}</div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="fw-extrabold fs-4" style={{ color: 'var(--sm-primary)' }}>₹{scannedProduct.price}</span>
                <span className="text-muted text-decoration-line-through">₹{scannedProduct.mrp}</span>
                <SmartScoreBadge score={scannedProduct.smartScore?.overallScore} />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-smartmart-primary" onClick={handleAddScannedToCart}>
                  <i className="bi bi-cart-plus me-1"></i> Add to Cart
                </button>
                <button className="btn btn-outline-danger" onClick={() => navigate('/compare')}>
                  <i className="bi bi-cpu me-1"></i> Compare Brands
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
