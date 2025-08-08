
# Crud App 
A simple CRUD app based on Reactjs, Node, Expressjs and MySQL

#### 📌 Recommended Production Deployment Approach
- We’ll split this into sections:
- Directory & Deployment Structure
- MongoDB Setup
- Backend Setup (Node + Express)
- Frontend Setup (React)
- Nginx Reverse Proxy (optional but highly recommended for production)
- Process Management (PM2) for backend
- Security & Production Practices

## Steps To Implements In Your Server

1. 📌**Clone the original repo** from (https://github.com/mhy20401/Inventory-Management-System-MERN-CRUD-App)

   ```BASH 
   git clone https://github.com/mhy20401/Inventory-Management-System-MERN-CRUD-App.git Inventory-Management-System

   cd Inventory-Management-System
   ```

2. 📌 **Install Mysql on your local system. I am using Linux - Ubuntu setup here:**
   ```BASH 
        sudo apt update && sudo apt upgrade -y
        sudo ufw allow 3306/tcp
        sudo apt install -y mysql-server mysql-client
        sudo systemctl start mysqld
        sudo systemctl enable mysqld
        sudo systemctl status mysql
    ```


2. 📌(***Optionally***) **Make few modifications to the folder structure**
<!-- ```bash
mv Frontend/inventory_management_system/* Frontend/ 
rm -rf Frontend/inventory_management_system
``` -->
The plan is to have a folder structure such as this below:
- `.env` file on both the `Frontend` and `Backend` Directories
- `log` folder in the root directory<br>
*See the folder structure of the project below:*

### 📌**Project Structure**