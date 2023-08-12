# File Uploader Application Overview

The File Uploader Application has been meticulously engineered to facilitate seamless file uploads to a server. Subsequent to the upload, users can access the file using the corresponding public/private key-pair provided in the post-upload response.

## Architectural Merits:

1. **Adherence to SOLID Principles**: The foundation of this application is grounded in the SOLID principles, ensuring a maintainable, extendable, and scalable architecture.

2. **Incorporation of Design Patterns:** Through judicious utilization of design patterns, the system not only gains in terms of efficiency but also provides clarity in terms of its structural layout.

3. **Inversion of Control (IoC) Mechanism:** Leveraging InversifyJs in the ES6 Codebase has empowered our application with the advantages of IoC, streamlining dependency management and offering improved modularity.

**Expandable Storage Capabilities:**

Presently, the system can be configured (via environment variables) to upload files either to `localstorage` or `Google Cloud Storage`. This, however, is not the limit of its adaptability. The system's extensibility feature ensures that integrating additional storage options, such as `Azure Cloud Storage`, in the future is streamlined. This would only require the implementation of basic functionalities specific to the new storage type, while still conforming to the established interface used for `localstorage` and `Google Cloud Storage`.

**Conclusion:**

In essence, this application is a testament to forward-thinking software design, offering easy scalability and feature integrations. By prioritizing foundational principles and design norms, we've paved the way for effortless future enhancements.
