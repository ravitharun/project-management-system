export const ActivityFormatJson = ({
    projectId,
    userId,
    action,
    entityType,
    entityId,
    entityName,
    message
}: any) => {

    const Format_json = {
        projectId,
        userId,
        action,
        entityType,
        entityId,
        entityName,
        message
    };

    return Format_json;
};