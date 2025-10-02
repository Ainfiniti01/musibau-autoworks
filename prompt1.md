Frontend Development (Musibau AutoWorks Website)

Goal:  
Build the frontend React app skeleton for Musibau AutoWorks website, including routing, components, and placeholder content for all required pages and sections. Focus on structure and functionality only — no CSS styling yet.

---

Requirements:

1. Framework: React (functional components + hooks)  
2. Routing: React Router with three main sections:  
   - Public site (main website)  
   - Customer dashboard (requires login, but login flow not implemented yet)  
   - Admin panel (protected area, no auth logic yet)  

3. Public Website Pages:  
   - Home  
   - Services (overview page)  
   - Individual service pages for: Painting, Mechanic, Panel Beating, Rewiring, Emergency Pickup, Home Service, Car Wash (coming soon), General Enquiry  
   - Booking page (form with inputs, no submission logic)  
   - E-commerce product showcase page (list products with image placeholders and contact button)  
   - Contact page (form with inputs, no submission logic)
- Reviews page (list placeholder reviews with star ratings)  

4. Customer Side Pages (skeletons only):  
   - Customer Dashboard (show placeholder “Welcome, [Customer Name]”)  
   - Registration page (form skeleton)  
   - Login page (form skeleton)  

5. Admin Side Pages (skeletons only):  
   - Admin Dashboard (show placeholder stats)  
   - Manage Services (list with placeholders, buttons for add/edit/delete)  
   - Manage Customers (list with placeholders)  
   - Manage Bookings (list with placeholders)  
   - Manage Products (list with placeholders)  

6. Navigation:  
   - Header and footer components common to all public pages.  
   - Separate navbars or sidebars for Customer and Admin sections.  
   - Links between pages (for example, from services overview to each service page).  

7. Component Design:  
   - Use reusable components for buttons, cards, forms, modals (with placeholder content).  
   - Pages should show simple placeholder text or dummy data.  
   - No API or backend integration yet.  

8. Project Structure:  
   - Organize components and pages in folders (e.g., /components, /pages/public, /pages/customer, /pages/admin).  
   - Use React Router v6 (or latest) for routing.  

9. Extra:
- Add comments in code to mark where styling and backend logic will be added later.  
   - Include optional dark mode toggle placeholder component (logic not implemented yet).  

---

Deliverables:  
- A fully functional React app with navigation and page routing working.  
- Each page displays relevant placeholders and structure.  
- No styling applied yet (plain HTML + React).  
- Clear code comments for next steps.