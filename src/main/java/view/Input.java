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
    private JLabel lblTop = new JLabel("SEU VOTO PARA");
    private JLabel lblNumber = new JLabel("Número:");
    private JLabel[] lblDigits;

    public Input(Cargo[] cargos) {
        this.offices = cargos;
        var cargo = this.offices[this.officeIndex];
        this.setLayout(null);
        this.lblTop.setBounds(0, 0, 300, 20);
        this.lblTop.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblTop);
        this.lblOffice = new JLabel(cargo.getNome());
        this.lblOffice.setBounds(70, 50, 300, 30);
        this.lblOffice.setFont(new Font("SansSerif", Font.BOLD, 24));
        this.add(this.lblOffice);
        this.lblNumber.setBounds(0, 150, 150, 20);
        this.lblNumber.setFont(new Font("SansSerif", Font.PLAIN, 12));
        this.add(this.lblNumber);
        this.createLabels(cargo.getQuantidadeNumeros());
    }

    private void createLabels(int quantity) {
        this.lblDigits = new JLabel[quantity];
        for (var i = 0; i < quantity; i++) {
            this.lblDigits[i] = new JLabel(" ", SwingConstants.CENTER);
            this.lblDigits[i].setBorder(BorderFactory.createLineBorder(Color.black));
            this.lblDigits[i].setFont(new Font("SansSerif", Font.PLAIN, 36));
            this.lblDigits[i].setPreferredSize(new Dimension(40, 40));
            this.lblDigits[i].setBounds(70 + 42 * i, 140, 40, 40);
            this.add(this.lblDigits[i]);
        }
    }

    public void confirma() {
        this.officeIndex++;
        this.numberIndex = 0;
        if (this.officeIndex < this.offices.length) {
            var cargo = this.offices[this.officeIndex];
            this.lblOffice.setText(cargo.getNome());
            this.createLabels(cargo.getQuantidadeNumeros());
        } else {
            this.lblOffice.setText("FIM");
        }
    }

    public void corrige() {
        this.numberIndex = 0;
        for (var label : this.lblDigits) {
            label.setText("");
        }
    }

    public void setNumber(String n) {
        if (this.numberIndex < this.lblDigits.length) {
            var label = this.lblDigits[this.numberIndex++];
            label.setText(n);
        }
    }
}
