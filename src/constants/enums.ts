export enum ROLES {
  //Puede ver, crear, editar y eliminar solo sus tareas.
  USER = 'USER',
  //Puede ver y modificar todas las tareas.
  ADMIN = 'ADMIN',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
