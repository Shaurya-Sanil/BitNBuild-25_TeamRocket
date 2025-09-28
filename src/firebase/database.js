import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

// Collections
const PROJECTS_COLLECTION = 'projects';
const PROPOSALS_COLLECTION = 'proposals';
const USERS_COLLECTION = 'users';

// Project operations
export const projectService = {
  // Create a new project
  async createProject(projectData, clientId) {
    try {
      const projectRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...projectData,
        clientId,
        status: 'open',
        proposals: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return projectRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Get all projects (for marketplace)
  async getAllProjects() {
    try {
      const projectsRef = collection(db, PROJECTS_COLLECTION);
      const q = query(projectsRef, where('status', '==', 'open'));
      const querySnapshot = await getDocs(q);
      
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return projects;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  // Get projects by client ID
  async getProjectsByClient(clientId) {
    try {
      const projectsRef = collection(db, PROJECTS_COLLECTION);
      const q = query(projectsRef, where('clientId', '==', clientId));
      const querySnapshot = await getDocs(q);
      
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return projects;
    } catch (error) {
      console.error('Error getting client projects:', error);
      throw error;
    }
  },

  // Get single project by ID
  async getProjectById(projectId) {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      const projectSnap = await getDoc(projectRef);
      
      if (projectSnap.exists()) {
        return {
          id: projectSnap.id,
          ...projectSnap.data()
        };
      } else {
        throw new Error('Project not found');
      }
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  // Update project
  async updateProject(projectId, updateData) {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      await updateDoc(projectRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  async deleteProject(projectId) {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      await deleteDoc(projectRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Listen to projects changes (real-time)
  listenToProjects(callback) {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, where('status', '==', 'open'));
    
    return onSnapshot(q, (querySnapshot) => {
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(projects);
    });
  },

  // Listen to client projects changes (real-time)
  listenToClientProjects(clientId, callback) {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, where('clientId', '==', clientId));
    
    return onSnapshot(q, (querySnapshot) => {
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(projects);
    });
  }
};

// Proposal operations
export const proposalService = {
  // Create a new proposal
  async createProposal(proposalData, projectId, freelancerId) {
    try {
      const proposalRef = await addDoc(collection(db, PROPOSALS_COLLECTION), {
        ...proposalData,
        projectId,
        freelancerId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Update project proposals count
      await this.updateProjectProposalsCount(projectId, 1);
      
      return proposalRef.id;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  },

  // Get proposals for a project
  async getProposalsByProject(projectId) {
    try {
      const proposalsRef = collection(db, PROPOSALS_COLLECTION);
      const q = query(proposalsRef, where('projectId', '==', projectId));
      const querySnapshot = await getDocs(q);
      
      const proposals = [];
      querySnapshot.forEach((doc) => {
        proposals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return proposals;
    } catch (error) {
      console.error('Error getting proposals:', error);
      throw error;
    }
  },

  // Get proposals by freelancer
  async getProposalsByFreelancer(freelancerId) {
    try {
      const proposalsRef = collection(db, PROPOSALS_COLLECTION);
      const q = query(proposalsRef, where('freelancerId', '==', freelancerId));
      const querySnapshot = await getDocs(q);
      
      const proposals = [];
      querySnapshot.forEach((doc) => {
        proposals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return proposals;
    } catch (error) {
      console.error('Error getting freelancer proposals:', error);
      throw error;
    }
  },

  // Update proposal status
  async updateProposalStatus(proposalId, status) {
    try {
      const proposalRef = doc(db, PROPOSALS_COLLECTION, proposalId);
      await updateDoc(proposalRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating proposal status:', error);
      throw error;
    }
  },

  // Update project proposals count
  async updateProjectProposalsCount(projectId, increment) {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      const projectSnap = await getDoc(projectRef);
      
      if (projectSnap.exists()) {
        const currentCount = projectSnap.data().proposals || 0;
        await updateDoc(projectRef, {
          proposals: currentCount + increment,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating proposals count:', error);
      throw error;
    }
  },

  // Listen to proposals changes (real-time)
  listenToProjectProposals(projectId, callback) {
    const proposalsRef = collection(db, PROPOSALS_COLLECTION);
    const q = query(proposalsRef, where('projectId', '==', projectId));
    
    return onSnapshot(q, (querySnapshot) => {
      const proposals = [];
      querySnapshot.forEach((doc) => {
        proposals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(proposals);
    });
  }
};

// User operations
export const userService = {
  // Create or update user profile
  async createOrUpdateUser(userId, userData) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      // If user doesn't exist, create it
      if (error.code === 'not-found') {
        await addDoc(collection(db, USERS_COLLECTION), {
          id: userId,
          ...userData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        console.error('Error creating/updating user:', error);
        throw error;
      }
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return {
          id: userSnap.id,
          ...userSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
};
