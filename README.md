# Example of Express API for Uploading Files to Private S3 Bucket via Presigned URL

This repository contains a simple Express API example demonstrating how to upload files to a private S3 bucket using a presigned URL. By utilizing presigned URLs, you can directly upload files from the client to a private S3 bucket. When downloading files, you can also perform the download operation using a presigned URL before the link expires.

## How to Use

1. **Clone the Repository**

 ```sh
git clone https://github.com/HamzaSahinn/AWS-S3-File-Private-Upload.git

cd AWS-S3-File-Private-Upload
 ```


2. **Install Necessary Packages**

```sh
npm install
```


3. **Set Environment Variables**

Copy the `.env.sample` file as `.env` and update your AWS credentials, such as S3 access keys.

4. **Start the Application**

```sh
npm start
```


5. **API Usage**

- File Upload:
  `POST /signPrivateFilePutURL`
  Sample request:
  ```json
  {
    "file_key": "awsfilekey.txt",
    "type": "text/plain"
  }
  ```
  You'll receive a presigned URL as a response. Use this URL to upload your file with PUT request.

- File Download:
  `POST /signPrivateFileGetURL`
  Sample request:
  ```json
  {
    "file_key": "awsfilekey.txt",
  }
  ```
  You'll receive a presigned URL as a response. Use this URL to download your file.

  - File Delete:
  `POST /deleteFileFromAWS`
  Sample request:
  ```json
  {
    "file_key": "awsfilekey.txt",
  }
  ```
  You'll receive a status 200 if deletion process finished


## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

---

If you have any questions or suggestions regarding the sample code and explanations, please feel free to get in touch. Thank you!

