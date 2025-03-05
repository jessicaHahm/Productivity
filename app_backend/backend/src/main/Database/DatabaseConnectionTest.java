import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnectionTest {

    public DatabaseConnectionTest() {
		// TODO Auto-generated constructor stub
	}
	
	public static void main(String[] args) {
        // Database connection properties
        String url = "jdbc:mysql://csci201-project-db.c8vhrafluil6.us-west-1.rds.amazonaws.com:3306/project-db";
        String user = "admin";
        String password = "";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(url, user, password);

            if (connection != null) {
                System.out.println("Database connection successful!");
                connection.close(); 
            } 
            else {
                System.out.println("Failed to connect to the database.");
            }
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC driver not found.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Database connection error.");
            e.printStackTrace();
        }
	}
    
}
