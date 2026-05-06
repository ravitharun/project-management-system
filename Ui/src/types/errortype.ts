export const validateProject = (formData: any) => {
    if (!formData) return "Project data missing";

    if (!formData.projectName?.trim())
        return "Project name is required";

    if (!formData.description?.trim())
        return "Description is required";



    if (!formData.owner?.name)
        return "Owner name is required";

    if (!formData.owner?.email)
        return "Owner email is required";

    if (!formData.teamMembers?.length)
        return "At least one team member is required";

    if (!formData.status)
        return "Status is required";

    if (!formData.priority)
        return "Priority is required";

    if (!formData.startDate)
        return "Start date is required";

    if (!formData.endDate)
        return "End date is required";

    if (!formData.budget?.total || isNaN(Number(formData.budget.total)))
        return "Valid total budget is required";

    if (!formData.budget?.spent || isNaN(Number(formData.budget.spent)))
        return "Valid spent budget is required";

    if (!formData.budget?.currency)
        return "Currency is required";

    if (!formData.tags?.length)
        return "At least one tag is required";

    if (!formData.data?.username)
        return "Username is required";

    if (!formData.data?.userEmail)
        return "User email is required";

    if (!formData.data?.userrole)
        return "User role is required";

    return null; // ✅ success
};