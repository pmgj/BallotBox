package view;

import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.Properties;

import javax.swing.AbstractAction;
import javax.swing.ActionMap;
import javax.swing.BoxLayout;
import javax.swing.ComponentInputMap;
import javax.swing.InputMap;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.KeyStroke;
import javax.swing.SwingUtilities;
import javax.swing.plaf.ActionMapUIResource;

public class Teste {

    private Cargo getCargo(String g) {
        Cargo ret = null;
        try {
            ret = (Cargo) Class.forName("view." + g).getDeclaredConstructor().newInstance();
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException | SecurityException
                | NoSuchMethodException | InvocationTargetException e) {
            System.out.println(e);
        }
        return ret;
    }

    public Teste() {
        JFrame frame = new JFrame("Eleição");
        Container c = frame.getContentPane();
        var bl = new BoxLayout(c, BoxLayout.X_AXIS);
        c.setLayout(bl);

        Properties prop = new Properties();
        String propFileName = "config.properties";
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
        if (inputStream != null) {
            try {
                prop.load(inputStream);
            } catch (IOException e) {
                System.out.println(e);
            }
        } else {
            System.out.println("Arquivo de propriedades '" + propFileName + "' não foi encontrado.");
        }
        String propCargos = prop.getProperty("cargos");
        String[] cargos = propCargos.split(",");
        var objs = new Cargo[cargos.length];
        for (int i = 0; i < objs.length; i++) {
            objs[i] = this.getCargo(cargos[i]);
        }

        var in = new Input(objs);
        c.add(in);

        GridLayout fl = new GridLayout(5, 3);
        JPanel panel = new JPanel(fl);

        ActionListener alNumber = ae -> in.setNumber(((JButton) ae.getSource()).getText());
        ActionMap actionMap = new ActionMapUIResource();
        actionMap.put("action_save", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                alNumber.actionPerformed(ae);
            }
        });
        JComponent[] components = new JComponent[] { new JButton("1"), new JButton("2"), new JButton("3"),
                new JButton("4"), new JButton("5"), new JButton("6"), new JButton("7"), new JButton("8"),
                new JButton("9"), new JLabel(), new JButton("0"), new JLabel() };
        for (JComponent comp : components) {
            if (comp instanceof JButton) {
                JButton b = (JButton) comp;
                b.setForeground(Color.WHITE);
                b.setBackground(Color.BLACK);
                b.addActionListener(alNumber);
                InputMap keyMap = new ComponentInputMap(comp);
                keyMap.put(KeyStroke.getKeyStroke(b.getText()), "action_save");
                SwingUtilities.replaceUIActionMap(comp, actionMap);
                SwingUtilities.replaceUIInputMap(comp, JComponent.WHEN_IN_FOCUSED_WINDOW, keyMap);
            }
            panel.add(comp);
        }

        ActionListener alConfirma = ae -> in.confirma();
        JButton branco = new JButton("Branco");
        branco.setBackground(Color.WHITE);
        branco.addActionListener(alConfirma);
        JButton corrige = new JButton("Corrige");
        corrige.setBackground(Color.RED);
        corrige.addActionListener(ae -> in.corrige());
        JButton confirma = new JButton("Confirma");
        confirma.setBackground(Color.GREEN);
        confirma.addActionListener(alConfirma);
        InputMap keyMap = new ComponentInputMap(confirma);
        keyMap.put(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0), "action_vote");
        ActionMap confirmaActionMap = new ActionMapUIResource();
        confirmaActionMap.put("action_vote", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                alConfirma.actionPerformed(ae);
            }
        });
        SwingUtilities.replaceUIActionMap(confirma, confirmaActionMap);
        SwingUtilities.replaceUIInputMap(confirma, JComponent.WHEN_IN_FOCUSED_WINDOW, keyMap);

        panel.add(branco);
        panel.add(corrige);
        panel.add(confirma);
        panel.setMaximumSize(new Dimension(250, 400));
        c.add(panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setPreferredSize(new Dimension(800, 400));
        frame.setVisible(true);
        frame.setResizable(false);
        frame.pack();
    }

    public static void main(String[] args) {
        new Teste();
    }
}
