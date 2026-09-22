import  { useState ,useEffect } from "react";
import  api  from "./api/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import Leads from "./pages/Leads";
import Tasks from "./pages/Tasks";
import Customers from "./pages/Customers";

import DealForm from "./components/DealForm";
import TaskForm from "./components/TaskForm";
import CustomerForm from "./components/CustomerForm";
import LeadsForm from "./components/LeadsForm";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState(null);

  const [leads, setLeads] = useState([]);
  const [leadPage, setLeadPage] = useState(1);
const [leadTotalPages, setLeadTotalPages] = useState(1);

  const [customers, setCustomers] = useState([]);
  const [customerPage, setCustomerPage] = useState(1);
const [customerTotalPages, setCustomerTotalPages] = useState(1);

  const [deals, setDeals] = useState([]);
  const [dealPage, setDealPage] = useState(1);
const [dealTotalPages, setDealTotalPages] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [taskPage, setTaskPage] = useState(1);
const [taskTotalPages, setTaskTotalPages] = useState(1);

  useEffect(() => {
  async function fetchCustomers() {
    try {
      const response = await api.get(
        `/customers?page=${customerPage}&limit=5`
      );

      setCustomers(response.data.getCustomer);
      setCustomerTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  fetchCustomers();
}, [customerPage]);

 useEffect(() => {
  async function fetchLeads() {
    try {
      const response = await api.get(
        `/leads?page=${leadPage}&limit=5`
      );

      setLeads(response.data.leads);
      setLeadTotalPages(response.data.pagination.totalPages);

    } catch (error) {
      console.log(error);
    }
  }

  fetchLeads();
}, [leadPage])


  useEffect(() => {
  async function fetchDeals() {
    try {
      const response = await api.get(
        `/deals?page=${dealPage}&limit=5`
      );

      setDeals(response.data.deals);
      setDealTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  fetchDeals();
}, [dealPage]);

 useEffect(() => {
  async function fetchTasks() {
    try {
      const response = await api.get(
        `/tasks?page=${taskPage}&limit=5`
      );

      setTasks(response.data.tasks);
      setTaskTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  fetchTasks();
}, [taskPage]);

   

useEffect(() => {
  async function fetchUser() {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.log("User fetch error:", error);
    }
  }

  fetchUser();
}, []);




  const [showFormLead, setShowFormLead] = useState(false);
  const [showFormDeal, setShowFormDeal] = useState(false);
  const [showFormTask, setShowFormTask] = useState(false);
  const [showFormCustomer, setShowFormCustomer] = useState(false);


  const [editCustomer, setEditCustomer] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [editDeal, setEditDeal] = useState(null);
  const [editTask, setEditTask] = useState(null);

  

  // =========================
  // CUSTOMER
  // =========================
  function openCustomerForm() {
    setShowFormCustomer(true);
  }

  function onAddCustomer(customer) {
    setCustomers([...customers, customer]);
    setShowFormCustomer(false);
  }
  async function handleDelete(id){
      try{
  await api.delete(`/customers/${id}`);
  setCustomers(customers.filter((customer)=> customer._id !== id ));
      }
      catch(error){
        console.log(error)
      }
    }

    function handleEditCustomer(customer) {
  setEditCustomer(customer);
  setShowFormCustomer(true);
}
function handleUpdateCustomer(updatedCustomer) {
  setCustomers(
    customers.map((customer) =>
      customer._id === updatedCustomer._id
        ? updatedCustomer
        : customer
    )
  );
  setEditCustomer(null);
  setShowFormCustomer(false);
}
  // =========================
  // LEAD
  // =========================

  function openLeadForm() {
    setShowFormLead(true);
  }

  function onAddLead(lead) {
    setLeads([...leads, lead]);
    setShowFormLead(false);
  }
 async  function handleDeleteLead(id){
    try{
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter((lead)=> lead._id !== id))
    }
    catch(error){
console.log(error)
    }
  }
  function handleEditLead(lead){
    setEditLead(lead)
    setShowFormLead(true);
  }
function handleUpdateLead(updatedLead){
  setLeads(
    leads.map((lead)=>
lead._id === updatedLead._id
    ? updatedLead
    :
    lead
    )
  )
  setEditLead(null);
  setShowFormLead(false)
}
  // =========================
  // DEAL
  // =========================

  function openDealForm() {
    setShowFormDeal(true);
  }

  function onAddDeal(deal) {
    setDeals([...deals, deal]);
    setShowFormDeal(false);
  }

  async function handleDeleteDeal(id){
    try{
await api.delete(`/deals/${id}`);
setDeals(deals.filter((deal)=> deal._id !== id))
    }
    catch(error){
      console.log(error)
    }
  }
  function handleEditDeal(deal){
    setEditDeal(deal)
    setShowFormDeal(true)
  }
  function handleUpdateDeal(updatedDeal){
try{
setDeals(
  deals.map((deal) =>
    deal._id === updatedDeal._id
  ? updatedDeal
  : deal
  )
)
setEditDeal(null);
setShowFormDeal(false)
}
catch(error){
  console.log(error)
}
  }

  // =========================
  // TASK
  // =========================

  function openTaskForm() {
    setShowFormTask(true);
  }

  function onAddTask(task) {
    setTasks([...tasks, task]);
    setShowFormTask(false);
  }

  async function handleDeleteTask(id){
    try{
await api.delete(`/tasks/${id}`)
setTasks(tasks.filter((task)=> task._id !== id

))
    }
    catch(error){
      console.log(error)
    }
  }
  function handleEditTask(task){
    setEditTask(task)
    setShowFormTask(true)
  }
  function handleUpdateTask(updatedTask){
try{
  setTasks(tasks.map((task)=>
    task._id === updatedTask._id
  ? 
  updatedTask
  : 
  task
   ))
   setEditTask(null);
   setShowFormTask(false)
}
catch(error){
  console.log(error)
}
  }

  return (
  <BrowserRouter>

    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD ROUTES */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
          <DashboardLayout>

            <Routes>

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                
                  <Dashboard
                    customers={customers}
                    deals={deals}
                    leads={leads}
                    />
                    
                }
              />

              {/* Deals */}
              <Route
                path="/deals"
                element={
                  <Deals
                    deals={deals}
                    onAddDeal={onAddDeal}
                    onOpenDealForm={openDealForm}
                    handleDeleteDeal={handleDeleteDeal}
                    handleEditDeal={handleEditDeal}
                    customers={customers}
                    user ={user}
                    page={dealPage}
                    totalPages={dealTotalPages}
                    onPageChange={setDealPage}
                  />
                }
              />

              {/* Leads */}
              <Route
                path="/leads"
                element={
                  <Leads
                    leads={leads}
                    onAddLead={openLeadForm}
                    handleDeleteLead={handleDeleteLead}
                    handleEditLead={handleEditLead}
                    customers={customers}
                    user ={user}
                    page={leadPage}
                    totalPage={leadTotalPages}
                    onPageChange={setLeadPage}
                  />
                }
              />

              {/* Tasks */}
              <Route
                path="/tasks"
                element={
                  <Tasks
                    tasks={tasks}
                    onOpenTaskForm={openTaskForm}
                    handleDeleteTask={handleDeleteTask}
                    customers={customers}
                    handleEditTask={handleEditTask}
                    user ={user}
                    page={taskPage}
                    onPageChange={setTaskPage}
                    totalPages={taskTotalPages}


                  />
                }
              />

              {/* Customers */}
              <Route
                path="/customers"
                element={
                  <Customers
                    customers={customers}
                    onAddCustomer={onAddCustomer}
                    onOpenCustomerForm={openCustomerForm}
                    handleDelete={handleDelete}
                    onEditCustomer={handleEditCustomer}
                    user = {user}
                    page={customerPage}
                    totalPage={customerTotalPages}
                    onPageChange={setCustomerPage}
                  />
                }
              />

              <Route
              path="/profile"
              element={<Profile/>}/>

            </Routes>

            {/* LEAD FORM */}
            {showFormLead && (
              <LeadsForm
                onAddLead={onAddLead}
                editLead={editLead}
                customers={customers}
                onUpdateLead={handleUpdateLead}
                onClose={() => {
                  setShowFormLead(false);
                  setEditLead(null);
                }}
              />
            )}

            {/* DEAL FORM */}
            {showFormDeal && (
              <DealForm
                customers={customers}
                editDeal={editDeal}
                handleUpdateDeal={handleUpdateDeal}
                onAddDeal={onAddDeal}
                onClose={() => {
                  setShowFormDeal(false);
                  setEditDeal(null);
                }}
              />
            )}

            {/* TASK FORM */}
            {showFormTask && (
              <TaskForm
                customers={customers}
                handleUpdateTask={handleUpdateTask}
                editTask={editTask}
                onAddTask={onAddTask}
                onClose={() => {
                  setShowFormTask(false);
                  setEditTask(null);
                }}
              />
            )}

            {/* CUSTOMER FORM */}
            {showFormCustomer && (
              <CustomerForm
                editCustomer={editCustomer}
                onAddCustomer={onAddCustomer}
                onUpdateCustomer={handleUpdateCustomer}
                onClose={() => {
                  setShowFormCustomer(false);
                  setEditCustomer(null);
                }}
              />
            )}

          </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>

  </BrowserRouter>
);
};

export default App;