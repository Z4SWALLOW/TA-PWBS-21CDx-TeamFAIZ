<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('h_hewanlauts', function (Blueprint $table) {
            // $table->id();

            // buat field id
            $table->integer('id')->autoIncrement();
            // // buat field npm
            $table->char('no', 8);
            // // buat field nama
            $table->string("nama", 100);
            // // buat field jenis
            $table->enum("jenis", ["Air Tawar", "Air Asin", "Air Payau", "Terumbu Karang", ""]);
            // // buat field deskripsi
            $table->text("deskripsi");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('h_hewanlauts');
    }
};
