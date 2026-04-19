// src/components/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity, clearCart } from '../CartSlice';

function CartItem({ onContinue }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCost = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    alert('Coming Soon! 🌿 Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.brand}>🌿 Paradise Nursery</span>
        <div style={styles.navLinks}>
          <button onClick={onContinue} style={styles.linkBtn}>Home</button>
          <button onClick={onContinue} style={styles.linkBtn}>Plants</button>
          <span style={styles.cartInfo}>🛒 Cart ({totalItems})</span>
        </div>
      </nav>

      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
            <p style={{ fontSize: '1.2rem' }}>Your cart is empty 🌱</p>
            <button onClick={onContinue} style={styles.continueBtn}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartRow}>
                <img src={item.image} alt={item.name} style={styles.img} />
                <div style={styles.details}>
                  <h3 style={{ margin: '0 0 5px' }}>{item.name}</h3>
                  <p style={{ color: '#666', margin: 0 }}>Unit Price: ${item.price.toFixed(2)}</p>
                  <p style={{ fontWeight: 'bold', color: '#2d5a27' }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div style={styles.qtyControl}>
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} style={styles.qtyBtn}>−</button>
                  <span style={{ margin: '0 12px', fontSize: '1.1rem' }}>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} style={styles.qtyBtn}>+</button>
                </div>
                <button onClick={() => dispatch(removeItem(item.id))} style={styles.deleteBtn}>🗑 Delete</button>
              </div>
            ))}

            {/* Cart Summary */}
            <div style={styles.summary}>
              <h3>Total Amount: <span style={{ color: '#2d5a27' }}>${totalCost.toFixed(2)}</span></h3>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button onClick={onContinue} style={styles.continueBtn}>← Continue Shopping</button>
                <button onClick={handleCheckout} style={styles.checkoutBtn}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 30px', background:'#2d5a27', color:'white', position:'sticky', top:0 },
  brand: { fontSize:'1.4rem', fontWeight:'bold' },
  navLinks: { display:'flex', gap:'20px', alignItems:'center' },
  linkBtn: { background:'none', border:'none', color:'white', fontSize:'1rem', cursor:'pointer' },
  cartInfo: { fontWeight:'bold' },
  cartRow: { display:'flex', alignItems:'center', gap:'20px', padding:'20px', border:'1px solid #ddd', borderRadius:'10px', marginBottom:'15px', flexWrap:'wrap' },
  img: { width:'100px', height:'100px', objectFit:'cover', borderRadius:'8px' },
  details: { flex:1, minWidth:'150px' },
  qtyControl: { display:'flex', alignItems:'center' },
  qtyBtn: { width:'32px', height:'32px', fontSize:'1.2rem', cursor:'pointer', border:'1px solid #ccc', borderRadius:'6px', background:'#f5f5f5' },
  deleteBtn: { background:'#e53935', color:'white', border:'none', padding:'8px 14px', borderRadius:'8px', cursor:'pointer' },
  summary: { marginTop:'30px', padding:'20px', background:'#f9f9f9', borderRadius:'10px', textAlign:'right' },
  continueBtn: { padding:'10px 24px', background:'#2d5a27', color:'white', border:'none', borderRadius:'25px', cursor:'pointer', fontSize:'1rem' },
  checkoutBtn: { padding:'10px 24px', background:'#4CAF50', color:'white', border:'none', borderRadius:'25px', cursor:'pointer', fontSize:'1rem' },
};

export default CartItem;