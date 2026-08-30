

const automationRuleSchema = require("../Models/Automation-rule")
const CreateAutomation_rule = async (req, res) => {


    try {
        const { rule } = req.body

        console.log(req.body, 'rule');
        if (!rule.projectId) {
            return res.status(400).json({ status: false, message: "Project ID is required" });
        }
        if (!rule.createdBy) {
            return res.status(400).json({ status: false, message: "Created By user ID is required" });
        }
        if (!rule.name || !rule.trigger || !rule.action.type || !rule.condition?.field || !rule.condition?.operator || !rule.condition?.value) {
            console.log("hey")
            return res.status(400).json({ status: false, message: "Rule name, trigger, condition, and action details are required" });
        }



        const saveAutomation = new automationRuleSchema({

            projectId: rule.projectId,

            ruleName: rule.name,

            trigger: rule.trigger,

            condition: {
                field: rule.condition.field,
                operator: rule.condition.operator,
                value: rule.condition.value
            },

            action: rule.action.type,

            actionValue: rule.actionValue || null,

            active: rule.active ?? true,

            createdBy: rule.createdBy

        });

        await saveAutomation.save();


        return res.status(201).json({ message: "Automation Rule Created", status: true })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "server error", status: false })
    }
}



module.exports = CreateAutomation_rule