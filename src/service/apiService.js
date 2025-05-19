import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    /** AUTH */
    static async registerUser(registration) {
        return axios.post(`${this.BASE_URL}/auth/register`, registration);
    }

    static async loginUser(loginDetails) {
        return axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
    }

    /** USERS */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/me`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/${userId}/bookings`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }
    static async updateUserProfile(userId, user) {
        const response = await axios.put(`${this.BASE_URL}/users/update/${userId}`, user, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    /** FLIGHTS */
    static async addFlight(formData) {
        const response = await axios.post(`${this.BASE_URL}/flights/add`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }

    static async getAllFlights() {
        const response = await axios.get(`${this.BASE_URL}/flights/all`);
        return response.data;
    }

    static async getFlightById(flightId) {
        const response = await axios.get(`${this.BASE_URL}/flights/${flightId}`);
        return response.data;
    }

    static async deleteFlight(flightId) {
        const response = await axios.delete(`${this.BASE_URL}/flights/delete/${flightId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async updateFlight(flightId, formData) {
        const response = await axios.put(`${this.BASE_URL}/flights/update/${flightId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }

    static async searchFlights(searchCriteria) {
        const response = await axios.post(`${this.BASE_URL}/flights/search`, searchCriteria);
        return response.data;
    }

    /** BOOKINGS */
    static async bookFlight(flightId, userId, booking) {
        const response = await axios.post(
            `${this.BASE_URL}/bookings/book-flight/${flightId}/${userId}`,
            booking,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getAllBookings() {
        const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async cancelBooking(bookingId) {
        const response = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    /** AUTHENTICATION */
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    static isAdmin() {
        return localStorage.getItem("role") === "ADMIN";
    }

    static isUser() {
        return localStorage.getItem("role") === "USER";
    }
}
