const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { fullName, jobPosition, password, imagePath } = JSON.parse(event.body);

    const getMaxIdParams = {
        TableName: 'EmployeeTable',
        ProjectionExpression: 'userID',
    };

    try {
        const data = await dynamoDB.scan(getMaxIdParams).promise();
        const userIDs = data.Items.map(item => parseInt(item.userID, 10));
        const maxID = userIDs.length > 0 ? Math.max(...userIDs) : 0;
        const newID = String(maxID + 1).padStart(9, '0');

        const putParams = {
            TableName: 'EmployeeTable',
            Item: {
                userID: newID,
                fullName,
                jobPosition,
                password,
                imagePath,
            },
        };

        await dynamoDB.put(putParams).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User added successfully', userID: newID }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error adding user', details: error }),
        };
    }
};
