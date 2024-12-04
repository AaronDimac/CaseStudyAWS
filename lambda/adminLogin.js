const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { userID, password } = JSON.parse(event.body);

    const params = {
        TableName: 'EmployeeTable',
        Key: { userID },
    };

    try {
        const data = await dynamoDB.get(params).promise();

        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        if (data.Item.password !== password) {
            return {
                statusCode: 403,
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error }),
        };
    }
};
