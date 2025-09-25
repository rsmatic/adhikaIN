import { useState, useCallback, useMemo } from "react";

export function useUserRolePermission() {
  const [role, setRoleState] = useState(null); // You can change default role here if needed

  // Permissions by role and module
  const permissions = useMemo(() => ({
    admin: {
      Employee: { canEdit: true, canDelete: true, canAdd: true },
      // Add other modules here
    },
    editor: {
      Employee: { canEdit: true, canDelete: false, canAdd: true },
    },
    viewer: {
      Employee: { canEdit: false, canDelete: false, canAdd: false },
    },
  }), []);

  // Stable version of setRole
  const setRole = useCallback((newRole) => {
    setRoleState(newRole);
  }, []);

  // Memoize userPermissions based on current role
  const userPermissions = useMemo(() => {
    return permissions[role] || permissions["viewer"];
  }, [role, permissions]);

  // Stable getModulePermission function
  const getModulePermission = useCallback((module) => {
    return userPermissions[module] || {};
  }, [userPermissions]);

  return { role, setRole, getModulePermission };
}
