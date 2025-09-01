export const TaskStructure = {
  id: 'string',           
  title: 'string',        
  description: 'string',  
  priority: 'string',     
  status: 'string',       
  dueDate: 'string',      
  createdAt: 'string',    
  projectId: 'string'     
};

// Project object structure
export const ProjectStructure = {
  id: 'string',           
  name: 'string',         
  description: 'string',  
  color: 'string',        
  createdAt: 'string'     
};

// Statistics object structure
export const StatsStructure = {
  total: 'number',        
  completed: 'number',    
  inProgress: 'number',   
  todo: 'number',         
  overdue: 'number'       
};