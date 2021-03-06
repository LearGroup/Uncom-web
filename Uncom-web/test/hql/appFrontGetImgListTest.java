package hql;

import java.io.PrintWriter;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import dao.hibernateStartPrepare;
import net.sf.json.JSONArray;

public class appFrontGetImgListTest {
	
	public static void main(String[] args) {
		SessionFactory sessionFactory = hibernateStartPrepare.getSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String  id ="1";
		String hql="select td from tripImgData td where td.tripAttractionId='"+id+"'";
		Query query = session.createQuery(hql);
		JSONArray json = JSONArray.fromObject(query.list());
		session.close();
		System.out.println(json);
	}
}
