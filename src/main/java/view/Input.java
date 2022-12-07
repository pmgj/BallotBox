package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class Input extends JPanel {
    private Cargo[] offices;
    private int officeIndex = 0;
    private int numberIndex = 0;
    private JLabel lblOffice;
    private JLabel lblTop = new JLabel();
    private JLabel lblNumber = new JLabel();
    private JLabel[] lblDigits;
    private JPanel jpDigits = new JPanel();
    private JLabel lblFoot = new JLabel();
    private JLabel lblFoot1 = new JLabel();
    private JLabel lblFoot2 = new JLabel();
    private JLabel lblFoot3 = new JLabel();

    public Input(Cargo[] cargos) {
        this.offices = cargos;
        var cargo = this.offices[this.officeIndex];
        this.setLayout(null);
        this.lblTop.setBounds(3, 0, 300, 20);
        this.lblTop.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblTop);
        this.lblOffice = new JLabel(cargo.getNome());
        this.lblOffice.setBounds(70, 50, 300, 30);
        this.lblOffice.setFont(new Font("SansSerif", Font.BOLD, 24));
        this.add(this.lblOffice);
        this.lblNumber.setBounds(3, 150, 150, 20);
        this.lblNumber.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblNumber);
        this.createLabels(cargo.getQuantidadeNumeros());
        this.jpDigits.setBounds(20, 140, 300, 45);
        this.add(this.jpDigits);
        int initialHeight = 300, stepHeight = 20;
        this.lblFoot.setBounds(0, initialHeight, 550, 20);
        this.lblFoot.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblFoot);
        this.lblFoot1.setBounds(3, initialHeight + stepHeight, 200, 20);
        this.lblFoot1.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblFoot1);
        this.lblFoot2.setBounds(36, initialHeight + 2 * stepHeight, 200, 20);
        this.lblFoot2.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblFoot2);
        this.lblFoot3.setBounds(45, initialHeight + 3 * stepHeight, 250, 20);
        this.lblFoot3.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblFoot3);
    }

    private void createLabels(int quantity) {
        this.lblDigits = new JLabel[quantity];
        for (var i = 0; i < quantity; i++) {
            this.lblDigits[i] = new JLabel(" ", SwingConstants.CENTER);
            this.lblDigits[i].setBorder(BorderFactory.createLineBorder(Color.black));
            this.lblDigits[i].setFont(new Font("SansSerif", Font.PLAIN, 36));
            this.lblDigits[i].setPreferredSize(new Dimension(40, 40));
            this.jpDigits.add(this.lblDigits[i]);
        }
    }

    public void confirma() {
        this.officeIndex++;
        this.numberIndex = 0;
        this.jpDigits.removeAll();
        this.jpDigits.repaint();
        if (this.officeIndex < this.offices.length) {
            var cargo = this.offices[this.officeIndex];
            this.lblOffice.setText(cargo.getNome());
            this.createLabels(cargo.getQuantidadeNumeros());
        } else {
            this.lblOffice.setText("FIM");
        }
        this.clearLabels();
    }

    public void corrige() {
        this.numberIndex = 0;
        for (var label : this.lblDigits) {
            label.setText("");
        }
        this.clearLabels();
    }

    public void setNumber(String n) {
        if (this.numberIndex >= 1) {
            this.lblTop.setText("SEU VOTO PARA");
            this.lblNumber.setText("Número:");
            this.lblFoot.setText(
                    "___________________________________________________________________________________________");
            this.lblFoot1.setText("Aperte a tecla:");
            this.lblFoot2.setText("CONFIRMA para PROSSEGUIR");
            this.lblFoot3.setText("CORRIGE para REINICIAR este VOTO");
        }
        if (this.numberIndex < this.lblDigits.length) {
            var label = this.lblDigits[this.numberIndex++];
            label.setText(n);
        }
    }

    private void clearLabels() {
        this.lblTop.setText("");
        this.lblNumber.setText("");
        this.lblFoot.setText("");
        this.lblFoot1.setText("");
        this.lblFoot2.setText("");
        this.lblFoot3.setText("");
    }
}
